import { patchUserSchema } from "@/app/validationSchema";
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
		const validation = patchUserSchema.safeParse(body)
		if(!validation.success){
			return NextResponse.json(validation.error.format(), {status: 400});
		}

		const { firstname, surname, role } = body;

		// Proceed with updating the user in Prisma
		const updatedUser = await prisma.user.update({
			where: { id: params.userId },
			data: {
				firstname,
				surname,
				role,
				// optionalClients: {
				// 	set: optionalClients.map(clientId => ({ id: clientId })),
				// },
			},
		});
	
		return NextResponse.json(updatedUser);

}