import authOptions from "@/app/auth/authOptions";
import { clientSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { UserRole } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest, 
  { params }: { params: { clientId: string } }
) {
  const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

  if (session.user.role !== UserRole.SUPERADMIN) {
    return NextResponse.json(
      "You don't have the access rights to update clients",
      { status: 403 }
    );
  }

  const body = await request.json();

  // Validate the incoming data using Zod schema
  const validation = clientSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ errors: validation.error.format() }, { status: 400 });
  }

  const { name } = validation.data;

  // Update the client in Prisma
  try {
    const updatedClient = await prisma.client.update({
      where: { id: parseInt(params.clientId) },
      data: { name },
    });

    return NextResponse.json(updatedClient, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Client not found or error updating client" }, { status: 404 });
  }
}