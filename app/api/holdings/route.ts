import authOptions from "@/app/auth/authOptions";
import { holdingSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { HoldingType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	if(!session.user.clientId){
		return NextResponse.json("Cannot find session user client", {status: 400});
	}

	const body = await request.json();
	const validation = holdingSchema.safeParse(body);
	if(!validation.success){
		return NextResponse.json(validation.error.format(), {status: 400});
	}

	const data:{
		title: string;
		field?: string;
		isMainHolding?: boolean;
		type: HoldingType;
		canAddIncidents: boolean;
		clientId:number;
	} = { 
		title: body.title, 
		field: body.field,
		canAddIncidents: body.canAddIncidents,
		type: body.type,
		clientId:session.user.clientId!
	}

	if(body.isMainHolding){
		data.isMainHolding = true;
		// data.type = HoldingType.STORE;
	}

	const newHolding = await prisma.holding.create({ data })

	return NextResponse.json(newHolding, { status: 201 });
}


export async function GET(request: NextRequest){

	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	if(!session.user.clientId){
		return NextResponse.json("Cannot find session user client", {status: 400});
	}

	const holdings = await prisma.holding?.findMany({ 
		where: { clientId: session.user.clientId! }, 
		orderBy: { title: 'asc'},
		include: { locations: true },
	});
	return NextResponse.json(holdings)
}