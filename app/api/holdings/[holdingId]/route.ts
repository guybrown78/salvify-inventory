
import authOptions from "@/app/auth/authOptions";
import { patchHoldingSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
	request: NextRequest,
	{ params }: { params: { holdingId: string } }
) {
	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	if(!session.user.clientId){
		return NextResponse.json("Cannot find session user client", {status: 400});
	}

	const body = await request.json();
	const validation = patchHoldingSchema.safeParse(body);
	if (!validation.success) {
		return NextResponse.json(validation.error.format(), { status: 400 });
	}

	const { title, field, canAddIncidents, type } = body;

	const holding = await prisma.holding.findUnique({
		where: { id: parseInt(params.holdingId) },
	});
	if (!holding) {
		return NextResponse.json({ error: "Invalid Holding" }, { status: 404 });
	}

	const updatedHolding = await prisma.holding.update({
		where: { id: holding.id },
		data: {
			title,
			field,
			canAddIncidents,
			type,
		},
	});

	return NextResponse.json(updatedHolding);
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { holdingId: string } }
) {

	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	if(!session.user.clientId){
		return NextResponse.json("Cannot find session user client", {status: 400});
	}

	const holdingId = parseInt(params.holdingId);
	const holding = await prisma.holding.findUnique({
		where: {
			id: holdingId,
			clientId: session.user.clientId!,
		},
	});
	if (!holding) {
		return NextResponse.json({ error: "Invalid Holding" }, { status: 404 });
	}
	await prisma.holding.delete({
		where: {
			id: holdingId,
		},
	});
	return NextResponse.json({});
}
