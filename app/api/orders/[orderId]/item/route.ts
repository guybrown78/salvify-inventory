import { getSessionUser } from "@/app/_utils/getSessionUser";
import authOptions from "@/app/auth/authOptions";
import { holdingItemSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(
	request: NextRequest,
	{ params }: { params: { 
		orderId: string,
	}}
) {

	const session = await getServerSession(authOptions);
	if(!session){
		return NextResponse.json({}, {status: 401});
	}
	const sessionUser = await getSessionUser();
	if(!sessionUser){
		return NextResponse.json("Cannot find session user", {status: 400});
	}
	if(!sessionUser.clientId){
		return NextResponse.json("Cannot find session user client", {status: 400});
	}
	
	const orderId = parseInt(params.orderId);

	const body = await request.json();
	const validation = holdingItemSchema.safeParse(body);
	if(!validation.success){
		return NextResponse.json(validation.error.format(), {status: 400});
	}


	// Validate Order
	const order = await prisma.order.findUnique({
		where:{
			id: orderId,
			clientId: sessionUser!.clientId!
		},
	})
	if(!order){
		return NextResponse.json({ error: 'Invalid Order'}, { status: 404 });
	}


	// Validate item 
	const item = await prisma.item.findUnique({ 
		where: { 
			id: body.itemId,
			clientId: sessionUser!.clientId!
		},
	});
	if (!item) {
		return NextResponse.json({ error: 'Invalid Item' }, { status: 404 });
	}

	// create new orderItem
	const newOrderItem = await prisma.orderItem.create({
		data: {
			itemId:body.itemId,
			orderId:orderId,
			quantity:parseInt(body.quantity),
			addedById: sessionUser!.id
		}
	})

	return NextResponse.json(newOrderItem, { status: 201 });
}