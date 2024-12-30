
import authOptions from "@/app/auth/authOptions";
import { locationSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { HoldingType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
	request: NextRequest,
	{ params }: { params: { holdingId: string }}
) {

	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	if(!session.user.clientId){
		return NextResponse.json("Cannot find session user client", {status: 400});
	}

	const body = await request.json();
	const validation = locationSchema.safeParse(body);
	if(!validation.success){
		return NextResponse.json(validation.error.format(), {status: 400});
	}

	const holding = await prisma.holding.findUnique({
		where: { id: parseInt(params.holdingId) }
	})
	if(!holding){
		return NextResponse.json({ error: 'Invalid Holding' }, {status: 404})
	}

	// 
	const newLocation = await prisma.location.create({
		data:{
			title: body.title,
			field: body.field,
			client:{
				connect: { id:session.user.clientId! }
			},
			holding:{
				connect: { id:holding.id }
			},
		},
	});
	
	return NextResponse.json(newLocation, { status: 201 });
}
