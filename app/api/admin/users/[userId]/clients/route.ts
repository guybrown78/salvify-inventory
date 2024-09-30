import { patchAdminUserSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getSessionUser } from "@/app/_utils/getSessionUser";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { UserRole } from "@prisma/client";

export async function PATCH(
	request: NextRequest, 
	{ params }: { params: { userId: string }}) {

		const sessionUser = await getSessionUser();
		if (!sessionUser || sessionUser.role !== UserRole.SUPERADMIN) {
			return NextResponse.json("You don't have the access rights to create users", { status: 403 });
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