import authOptions from "@/app/auth/authOptions";
import { patchLocationSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(
	request: NextRequest,
	{ params }: { params: { 
		holdingId: string,
		locationId: string
	}}
) {

	const session = await getServerSession(authOptions);
	if(!session){
		return NextResponse.json({}, {status: 401});
	}

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

	const session = await getServerSession(authOptions);
	if(!session){
		return NextResponse.json({}, {status: 401});
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

	await prisma.location.delete({
		where: {id: location.id }
	})

	return NextResponse.json({})
}
