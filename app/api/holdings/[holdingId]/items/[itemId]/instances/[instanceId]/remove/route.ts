import { removeInstanceSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "@/app/auth/authOptions";
import { useSearchParams } from 'next/navigation'
import { convertDateToISO8601 } from '@/app/_utils/date';


export async function POST(
	request: NextRequest,
	{ params }: { params: { 
		holdingId: string,
		itemId: string,
		instanceId: string,
	}}
) {

	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	if(!session.user.clientId){
		return NextResponse.json("Cannot find session user client", {status: 400});
	}

	const body = await request.json();

	// Validate payload
	const validation = removeInstanceSchema.safeParse(body);
	if(!validation.success){
		return NextResponse.json(validation.error.format(), {status: 400});
	}

	// Check Holding
	const holding = await prisma.holding.findUnique({
		where: { id: parseInt(params.holdingId) }
	})
	if(!holding){
		return NextResponse.json({ error: 'Invalid Holding' }, {status: 404})
	}

	// Check Item
	const item = await prisma.item.findUnique({
		where: { id: parseInt(params.itemId) }
	})
	if(!item){
		return NextResponse.json({ error: 'Invalid Item' }, {status: 404})
	}

	// Check Location
	const url = new URL(request.url)
  const locationId = url.searchParams.get("locationId")
	if(!locationId ){
		return NextResponse.json({ error: 'Invalid LocationId' }, {status: 404})
	}
	const location = await prisma.location.findFirst({
		where: {
			id: parseInt(locationId),
			holding: {
				id: holding.id
			}
		}
	});
	if(!location){
		return NextResponse.json({ error: 'Invalid Location in Holding' }, {status: 404})
	}


	// Check Instance 
	const instance = await prisma.instance.findFirst({
		where: {
			id: parseInt(params.instanceId),
			item: {
				id: item.id
			},
			location: {
				id: location.id
			}
		}
	});
	if(!instance){
		return NextResponse.json({ error: 'Invalid Instance' }, {status: 404})
	}


	// Update Instance quantity by removing the body.quantity from the count

	const updatedQuantity = instance.quantity - body.quantity;

	// Ensure the quantity doesn't go negative
	if (updatedQuantity < 0) {
		return NextResponse.json({ error: 'Invalid quantity' }, { status: 400 });
	}

	// Update the instance with the new quantity
	const updatedInstance = await prisma.instance.update({
		where: { id: instance.id },
		data: { quantity: updatedQuantity }
	});

	// check date
	let prismaDateTime;
	prismaDateTime = await convertDateToISO8601(body.removedAt);
	if(body.removedAt !== "" && !prismaDateTime){
		return NextResponse.json({ error: 'Invalid RemovedAt Date' }, {status: 404})
	}


	// Create a RemovedInstanceItem in the database
	const removedInstance = await prisma.removeInstance.create({
		data: {
			instance:{
				connect: { id:instance.id }
			},
			holding:{
				connect: { id:holding.id }
			},
			location:{
				connect: { id:location.id }
			},
			removedBy:{
				connect: { id:session.user.id }
			},
			client:{
				connect: { id:session.user.clientId! }
			},
			quantity: body.quantity,
			reason: body.reason, 
			removedAt: prismaDateTime ?? new Date(),
			prf: body.prf || null,
			otherReason: body.otherReason || null,
		}
	});

	return NextResponse.json(removedInstance, { status: 201 });
}
