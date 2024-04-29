import authOptions from "@/app/auth/authOptions";
import { addInstanceSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { convertDateToISO8601 } from '@/app/_utils/date';


export async function POST(request: NextRequest) {

	const session = await getServerSession(authOptions);
	if(!session){
		return NextResponse.json({}, {status: 401});
	}

	const body = await request.json();
	const validation = addInstanceSchema.safeParse(body);
	if(!validation.success){
		return NextResponse.json(validation.error.format(), {status: 400});
	}
	
	// check the item
	const item = await prisma.item.findUnique({
		where: { id: parseInt(body.itemId) }
	})
	if(!item){
		return NextResponse.json({ error: 'Invalid Item' }, {status: 404})
	}
	// check the location
	const location = await prisma.location.findUnique({
		where: { id: parseInt(body.locationId) }
	})
	if(!location){
		return NextResponse.json({ error: 'Invalid Location' }, {status: 404})
	}
	// check date
	let prismaDateTime;
	prismaDateTime = await convertDateToISO8601(body.expiryDate);
	if(body.expiryDate !== "" && !prismaDateTime){
		return NextResponse.json({ error: 'Invalid Date' }, {status: 404})
	}

	const newInstance = await prisma.instance.create({ data: {
		itemId: item.id,
		locationId: location.id,
		quantity: parseInt(body.quantity),
		expiryDate: prismaDateTime,
		batch: body.batch
	}})


	return NextResponse.json(newInstance, { status: 201 });
}