import { patchLocationSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(
	request: NextRequest,
	{ params }: { params: { 
		holdingId: string,
		locationId: string
	}}
) {

	const body = await request.json();
	const validation = patchLocationSchema.safeParse(body);
	if(!validation.success){
		return NextResponse.json(validation.error.format(), {status: 400});
	}

	const holding = await prisma.holding.findUnique({
		where: { id: parseInt(params.holdingId) }
	})
	if(!holding){
		return NextResponse.json({ error: 'Invalid Holding' }, {status: 404})
	}

	const location = await prisma.location.findUnique({
		where: { id: parseInt(params.locationId) }
	})
	if(!location){
		return NextResponse.json({ error: 'Invalid Location' }, {status: 404})
	}

	const { title, field } = body
	const updatedLocation = await prisma.location.update({
		where: { id: location.id },
		data: {
			title,
			field
		}
	})

	return NextResponse.json(updatedLocation);
}


export async function DELETE(
	request: NextRequest,
	{ params }: { params: { 
		holdingId: string,
		locationId: string
	}}
) {

	
	console.log("DELETE","holdingId",params.holdingId,"locationId",params.locationId)
	return NextResponse.json({})
}
