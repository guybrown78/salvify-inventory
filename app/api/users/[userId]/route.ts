import { patchUserSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { UserRole } from "@prisma/client";

export async function PATCH(
	request: NextRequest, 
	{ params }: { params: { userId: string }}) {

		const session = await getServerSession(authOptions);

		if (!session || !session.user) {
			return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
		}
	
		if(!session.user.clientId){
			return NextResponse.json("Cannot find session user client", {status: 400});
		}

		const body = await request.json();
		const validation = patchUserSchema.safeParse(body)
		if(!validation.success){
			return NextResponse.json(validation.error.format(), {status: 400});
		}

		const { firstname, surname, email } = body;

		// Proceed with updating the user in Prisma
		const updatedUser = await prisma.user.update({
			where: { id: params.userId },
			data: {
				firstname,
				surname,
				name: `${firstname} ${surname}`,
				email,
			},
		});
	
		return NextResponse.json(updatedUser);

}