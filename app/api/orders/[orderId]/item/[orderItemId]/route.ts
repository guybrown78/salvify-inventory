
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { patchOrderItemSchema } from "@/app/validationSchema";
import authOptions from "@/app/auth/authOptions";

export async function PATCH(
	request: NextRequest, 
	{ params }: { params: { 
		orderId: string,
		orderItemId: string
	 }}) {

		const session = await getServerSession(authOptions);
		if(!session){
			return NextResponse.json({}, {status: 401});
		}
		
		const body = await request.json();
		const validation = patchOrderItemSchema.safeParse(body)
		if(!validation.success){
			return NextResponse.json(validation.error.format(), {status: 400});
		}

		const orderId = parseInt(params.orderId);
		const orderItemId = parseInt(params.orderItemId);

		const orderItem = await prisma.orderItem.findUnique({
			where: { 
				id: orderItemId,
				orderId: orderId,
			}
		});
		if(!orderItem){
			return NextResponse.json({ error: 'Invalid OrderItem'}, {status: 404});
		}


		const updatedOrderItem = await prisma.orderItem.update({
			where: {
				id: orderItemId,
				orderId: orderId,
			},
			data: {
				quantity: body.quantity
			}
		});

		return NextResponse.json(updatedOrderItem)
}



export async function DELETE(
	request: NextRequest, 
	{ params }: { params: { 
		orderId: string,
		orderItemId: string
	}}) {

		const session = await getServerSession(authOptions);
		if(!session){
			return NextResponse.json({}, {status: 401});
		}
		
		const orderId = parseInt(params.orderId);
		const orderItemId = parseInt(params.orderItemId);

		const orderItem = await prisma.orderItem.findUnique({
			where: { 
				id: orderItemId,
				orderId: orderId,
			}
		});
		if(!orderItem){
			return NextResponse.json({ error: 'Invalid OrderItem'}, {status: 404});
		}

		await prisma.orderItem.delete({
			where: {
				id: orderItemId,
				orderId: orderId,
			}
		})

		return NextResponse.json({})
}