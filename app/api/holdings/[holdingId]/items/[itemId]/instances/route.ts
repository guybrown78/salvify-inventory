import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function GET(
	request: NextRequest,
	{ params }: { params: { 
		holdingId: string,
		itemId: string
	}}
) {
	// 
	const session = await getServerSession(authOptions);
	if(!session){
		return NextResponse.json({}, {status: 401});
	}
	// check the holding
	const holding = await prisma.holding.findUnique({
		where: { id: parseInt(params.holdingId) }
	})
	if(!holding){
		return NextResponse.json({ error: 'Invalid Holding' }, {status: 404})
	}
	// check the item
	const item = await prisma.item.findUnique({
		where: { id: parseInt(params.itemId) }
	})
	if(!item){
		return NextResponse.json({ error: 'Invalid Item' }, {status: 404})
	}

	const instances = await prisma.instance.findMany({
		where: {
			itemId: parseInt(params.itemId),
			location: {
				holdingId: parseInt(params.holdingId),
			},
		},
		include: {
			location: true,
		},
	});

	return NextResponse.json(instances)
}