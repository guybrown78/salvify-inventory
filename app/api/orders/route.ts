import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { orderSchema } from '@/app/validationSchema';
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { getSessionUser } from "@/app/_utils/getSessionUser";

export async function POST(request: NextRequest) {

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

	const clientId = sessionUser!.clientId!

	const latestOrder = await prisma.order.findFirst({
    where: { clientId },
    orderBy: { orderNumber: 'desc' },
  });

	// Calculate the next orderNumber
  const nextOrderNumber = latestOrder ? latestOrder.orderNumber + 1 : 1;

	const body = await request.json();
	const validation = orderSchema.safeParse(body);
	if(!validation.success){
		return NextResponse.json(validation.error.format(), {status: 400});
	}

	const newOrder = await prisma.order.create({
		data: {
			title: body.title, 
			notes: body.notes,
			orderNumber: nextOrderNumber,
			assignedToUserId: sessionUser!.id,
			clientId: clientId,
		}
	})
	console.log(newOrder)
	return NextResponse.json(newOrder, { status: 201 });
}