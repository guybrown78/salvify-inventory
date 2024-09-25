import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { clientSchema } from "@/app/validationSchema";
import { getSessionUser } from "@/app/_utils/getSessionUser";
import { UserRole } from "@prisma/client";

export async function POST(request: Request) {
  const sessionUser = await getSessionUser();

  if (!sessionUser) {
    return NextResponse.json("Cannot find session user", { status: 400 });
  }
  if (sessionUser.role !== UserRole.SUPERADMIN) {
    return NextResponse.json(
      "You don't have the access rights to create clients",
      { status: 403 }
    );
  }
  
	const body = await request.json();

	const parseResult = clientSchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      { errors: parseResult.error.flatten() },
      { status: 400 }
    );
  }

	const { name } = parseResult.data;

	const newClient = await prisma.client.create({
    data: {
      name,
    },
  });

  return NextResponse.json(newClient, { status: 201 });
}
