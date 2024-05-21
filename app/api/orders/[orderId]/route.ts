import { patchOrderSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { getSessionUser } from "@/app/_utils/getSessionUser";

export async function PATCH(
	request: NextRequest, 
	{ params }: { params: { orderId: string }}) {

		const session = await getServerSession(authOptions);
		if(!session){
			return NextResponse.json({}, {status: 401});
		}

		const body = await request.json();
		const validation = patchOrderSchema.safeParse(body)
		if(!validation.success){
			return NextResponse.json(validation.error.format(), {status: 400});
		}

		const { assignedToUserId, title, notes, status } = body;
		if(assignedToUserId){
			const user = await prisma.user.findUnique({ where: { id: assignedToUserId}});
			if(!user){
				return NextResponse.json({ error: 'Invalid user.'}, {status: 400})
			}
		}

		const order = await prisma.order.findUnique({
			where: { id: parseInt(params.orderId) }
		});
		if(!order){
			return NextResponse.json({ error: 'Invalid Order'}, {status: 404});
		}

		const updatedOrder = await prisma.order.update({
			where: { id: order.id },
			data: {
				title,
				notes,
				assignedToUserId,
				status
			}
		});

		return NextResponse.json(updatedOrder)
}


export async function DELETE(
	request: NextRequest, 
	{ params }: { params: { orderId: string }}) {

		const sessionUser = await getSessionUser();
		if(!sessionUser){
			return NextResponse.json("Cannot find session user", {status: 400});
		}
		if(!sessionUser.clientId){
			return NextResponse.json("Cannot find session user client", {status: 400});
		}

		const orderId = parseInt(params.orderId);

		const order = await prisma.order.findUnique({
			where: { 
				id: orderId				
			}
		});
		if(!order){
			return NextResponse.json({ error: 'Invalid Order'}, {status: 404});
		}

		 await prisma.$transaction([
        prisma.orderItem.deleteMany({
					where: {
						orderId: orderId
					}
        }),
        prisma.order.delete({
					where: { 
						id: orderId 
					}
        })
    ]);

		return NextResponse.json({})
}


