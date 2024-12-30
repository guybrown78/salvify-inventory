import authOptions from "@/app/auth/authOptions";
import { patchAdminUserSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { UserRole } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
	request: NextRequest, 
	{ params }: { params: { userId: string }}) {

		const session = await getServerSession(authOptions);

		if (!session || !session.user) {
			return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
		}
		if (session.user.role !== UserRole.SUPERADMIN) {
			return NextResponse.json(
				"You don't have the access rights to update users",
				{ status: 403 }
			);
		}

		const body = await request.json();
		const validation = patchAdminUserSchema.safeParse(body)
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