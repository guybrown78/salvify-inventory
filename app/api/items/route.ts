import authOptions from "@/app/auth/authOptions";
import { itemSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {

	const session = await getServerSession(authOptions);
	if(!session){
		return NextResponse.json({}, {status: 401});
	}
	
	const body = await request.json();
	const validation = itemSchema.safeParse(body);
	if(!validation.success){
		return NextResponse.json(validation.error.format(), {status: 400});
	}

	// create new item
	const newItem = await prisma.item.create({
		data: {
			title: body.title,
			information: body.information || null,
			requiredCount: body.requiredCount || null,
			type: body.type,
			category: body.category,
			grouping: body.grouping,
			instructionsURL: body.instructionsURL || null,
 			bnfURL: body.bnfURL || null,
  		emcPilURL: body.emcPilURL || null,
		}
	})

	return NextResponse.json(newItem, { status: 201 });
}