
import authOptions from "@/app/auth/authOptions";
import { holdingItemSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(
	request: NextRequest,
	{ params }: { params: { 
		holdingId: string,
		itemId: string
	}}
) {

	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	if(!session.user.clientId){
		return NextResponse.json("Cannot find session user client", {status: 400});
	}
	
	const holdingId = parseInt(params.holdingId);
	const itemId = parseInt(params.itemId);
	const body = await request.json();
	const validation = holdingItemSchema.safeParse(body);
	if(!validation.success){
		return NextResponse.json(validation.error.format(), {status: 400});
	}


	// Validate holding 
	const holding = await prisma.holding.findUnique({ 
		where: { 
			id: holdingId,
			clientId: session.user.clientId!
		},
	});
	if (!holding) {
		return NextResponse.json({ error: 'Invalid Holding' }, { status: 404 });
	}


	// Validate item 
	const item = await prisma.item.findUnique({ 
		where: { 
			id: itemId,
			clientId: session.user.clientId!
		},
	});
	if (!item) {
		return NextResponse.json({ error: 'Invalid Item' }, { status: 404 });
	}


	// create new holdingItem
	const newHoldingItem = await prisma.holdingItem.create({
		data: {
			itemId:itemId,
			holdingId:holdingId,
			requiredMinCount:body.requiredMinCount,
			clientId:session.user.clientId!
		}
	})

	return NextResponse.json(newHoldingItem, { status: 201 });
}