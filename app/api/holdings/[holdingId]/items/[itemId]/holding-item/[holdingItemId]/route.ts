
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { holdingItemSchema } from "@/app/validationSchema";
import authOptions from "@/app/auth/authOptions";


export async function PATCH(
	request: NextRequest, 
	{ params }: { params: { 
		holdingId: string,
		itemId: string
		holdingItemId: string 
	 }}) {

		const session = await getServerSession(authOptions);
		if(!session){
			return NextResponse.json({}, {status: 401});
		}
		
		const body = await request.json();
		const validation = holdingItemSchema.safeParse(body)
		if(!validation.success){
			return NextResponse.json(validation.error.format(), {status: 400});
		}

		const holdingId = parseInt(params.holdingId);
		const itemId = parseInt(params.itemId);
		const holdingItemId = parseInt(params.holdingItemId);

		

		const holdingItem = await prisma.holdingItem.findUnique({
			where: { 
				id: holdingItemId,
				holdingId: holdingId,
				itemId: itemId
			}
		});
		if(!holdingItem){
			return NextResponse.json({ error: 'Invalid Holding Item'}, {status: 404});
		}


		const updatedHoldingItem = await prisma.holdingItem.update({
			where: {
				id: holdingItemId,
				holdingId: holdingId,
				itemId: itemId
			},
			data: {
				requiredMinCount: body.requiredMinCount
			}
		});

		return NextResponse.json(updatedHoldingItem)
}


export async function DELETE(
	request: NextRequest, 
	{ params }: { params: { 
		holdingId: string,
		itemId: string
		holdingItemId: string 
	}}) {

		const session = await getServerSession(authOptions);
		if(!session){
			return NextResponse.json({}, {status: 401});
		}
		
		const holdingId = parseInt(params.holdingId);
		const itemId = parseInt(params.itemId);
		const holdingItemId = parseInt(params.holdingItemId);

		const holdingItem = await prisma.holdingItem.findUnique({
			where: { 
				id: holdingItemId,
				holdingId: holdingId,
				itemId: itemId
			}
		});
		if(!holdingItem){
			return NextResponse.json({ error: 'Invalid Holding Item'}, {status: 404});
		}

		await prisma.holdingItem.delete({
			where: {
				id: holdingItemId,
				holdingId: holdingId,
				itemId: itemId
			}
		})

		return NextResponse.json({})
}