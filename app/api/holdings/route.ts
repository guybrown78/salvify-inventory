import authOptions from "@/app/auth/authOptions";
import { holdingSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { HoldingType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

	// const session = await getServerSession(authOptions);
	// if(!session){
	// 	return NextResponse.json({}, {status: 401});
	// }
	
	const body = await request.json();
	const validation = holdingSchema.safeParse(body);
	if(!validation.success){
		return NextResponse.json(validation.error.format(), {status: 400});
	}

	const data:{
		title: string;
		field?: string;
		isMainHolding?: boolean;
		type?: HoldingType;
	} = { 
		title: body.title, 
		field: body.field 
	}

	if(body.isMainHolding){
		data.isMainHolding = true;
		data.type = HoldingType.STORE;
	}

	console.log(data)
	const newHolding = await prisma.holding.create({ data })

	return NextResponse.json(newHolding, { status: 201 });
}