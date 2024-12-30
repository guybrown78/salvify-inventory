import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
	request: NextRequest,
	{ params }: { params: { userId: string } }
) {
	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	if (!session.user.clientId) {
		return NextResponse.json("Cannot find session user client", {
			status: 400,
		});
	}

	if (session.user.id !== params.userId) {
		return NextResponse.json("You don't have the access rights to update", {
			status: 403,
		});
	}

	const body = await request.json();

	// Need to add validation to set the current selected client for the user

	// const validation = patchAdminUserSchema.safeParse(body)
	// if(!validation.success){
	// 	return NextResponse.json(validation.error.format(), {status: 400});
	// }

	const { clientIds } = body;

	// Proceed with updating the user in Prisma
	const updatedUser = await prisma.user.update({
		where: { id: params.userId },
		data: {
			optionalClients: {
				set: clientIds.map((clientId: number[]) => ({ id: clientId })),
			},
		},
	});

	return NextResponse.json(updatedUser);
}
