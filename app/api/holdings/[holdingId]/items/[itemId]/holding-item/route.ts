import { getSessionUser } from "@/app/_utils/getSessionUser";
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
	
	const holdingId = parseInt(params.holdingId);
	const itemId = parseInt(params.itemId);
	const body = await request.json();
	const validation = holdingItemSchema.safeParse(body);
	if(!validation.success){
		return NextResponse.json(validation.error.format(), {status: 400});
	}
	console.log(body, holdingId, itemId)

	// Validate holding 
	const holding = await prisma.holding.findUnique({ 
		where: { 
			id: holdingId,
			clientId: sessionUser!.clientId!
		},
	});
	if (!holding) {
		return NextResponse.json({ error: 'Invalid Holding' }, { status: 404 });
	}

	console.log(holding);

	// Validate item 
	const item = await prisma.item.findUnique({ 
		where: { 
			id: itemId,
			clientId: sessionUser!.clientId!
		},
	});
	if (!item) {
		return NextResponse.json({ error: 'Invalid Item' }, { status: 404 });
	}
	console.log(item);

	// create new holdingItem
	const newHoldingItem = await prisma.holdingItem.create({
		data: {
			itemId:itemId,
			holdingId:holdingId,
			requiredMinCount:body.requiredMinCount,
			clientId:sessionUser!.clientId!
		}
	})

	return NextResponse.json(newHoldingItem, { status: 201 });
}