import { getSessionUser } from "@/app/_utils/getSessionUser";
import authOptions from "@/app/auth/authOptions";
import { swapInstanceSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
	request: NextRequest, 
	{ params }: { params: { 
		holdingId: string,
		itemId: string,
		instanceId: string,
	 }}) {

		try {
			const session = await getServerSession(authOptions);
			if (!session) {
				return NextResponse.json({}, { status: 401 });
			}
	
			// const userEmail = session?.user?.email;
			// if (!userEmail) {
			// 	return NextResponse.json({ error: 'User email not found' }, { status: 404 });
			// }
	
			// const user = await prisma.user.findUnique({
			// 	where: { email: userEmail }
			// });
			// if (!user) {
			// 	return NextResponse.json({ error: 'Invalid User' }, { status: 404 })
			// }
	
			const sessionUser = await getSessionUser();
			if(!sessionUser){
				return NextResponse.json("Cannot find session user", {status: 400});
			}
			if(!sessionUser.clientId){
				return NextResponse.json("Cannot find session user client", {status: 400});
			}

			const body = await request.json();
			const validation = swapInstanceSchema.safeParse(body)
			if (!validation.success) {
				return NextResponse.json(validation.error.format(), { status: 400 });
			}
	
			const instanceId = parseInt(params.instanceId);
			const holdingId = parseInt(params.holdingId);
			const locationId = parseInt(body.locationId);
	
			// Fetch the instance along with its location
			const instance = await prisma.instance.findUnique({
				where: { id: instanceId },
				include: { location: true }
			});
	
			if (!instance) {
				return NextResponse.json({ error: "Instance not found" }, { status: 404 });
			}
	
			// Validate holding and location
			if (instance.location.holdingId !== holdingId) {
				const holding = await prisma.holding.findUnique({ where: { id: holdingId } });
				if (!holding) {
					return NextResponse.json({ error: 'Invalid Holding' }, { status: 404 });
				}
			}
	
			if (instance.location.id !== locationId) {
				const location = await prisma.location.findUnique({ where: { id: locationId } });
				if (!location) {
					return NextResponse.json({ error: 'Invalid Location' }, { status: 404 });
				}
			}
	
			// Check if the quantity to swap is valid
			if (body.quantity > instance.quantity) {
				return NextResponse.json({ error: 'Trying to swap too many. The quantity selected is greater than the instance count' }, { status: 400 });
			}
	
			// Update the original instance quantity
			const updatedInstance = await prisma.instance.update({
				where: { id: instanceId },
				data: {
					quantity: {
						decrement: body.quantity // Decrement the quantity by the amount swapped
					}
				}
			});
	
			// Create a new instance for the swapped quantity
			const newInstanceId = (await prisma.instance.create({
				data: {
					itemId: instance.itemId,
					locationId: locationId,
					quantity: body.quantity,
					expiryDate: instance.expiryDate,
					batch: instance.batch,
					clientId: sessionUser!.clientId!,
					addedById: sessionUser!.id,
					previousInstanceId: instanceId
				}
			})).id;
	
			return NextResponse.json({ updatedInstance, newInstanceId });
		} catch (error: any) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}
}