import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { clientSchema } from "@/app/validationSchema";
import { getSessionUser } from "@/app/_utils/getSessionUser";
import { UserRole } from "@prisma/client";

export async function PATCH(
  request: NextRequest, 
  { params }: { params: { clientId: string } }
) {
  const sessionUser = await getSessionUser();

  // Check if there is a session user and if they are a SUPERADMIN
  if (!sessionUser) {
    return NextResponse.json({ message: "Cannot find session user" }, { status: 400 });
  }

  if (sessionUser.role !== UserRole.SUPERADMIN) {
    return NextResponse.json({ message: "You don't have the access rights to update clients" }, { status: 403 });
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