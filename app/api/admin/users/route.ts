import authOptions from "@/app/auth/authOptions";
import { adminUserSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const session = await getServerSession(authOptions);
	
	if (!session || !session.user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}
  if (session.user.role !== UserRole.SUPERADMIN) {
    return NextResponse.json(
      "You don't have the access rights to create users",
      { status: 403 }
    );
  }

	// Parse and validate the incoming data using Zod schema
	const body = await request.json();

	const parseResult = adminUserSchema.safeParse(body);

	if (!parseResult.success) {
		// If validation fails, return the error messages
		return NextResponse.json(
			{ errors: parseResult.error.flatten() },
			{ status: 400 }
		);
	}

	const { firstname, surname, email, client, password, role } = body;

	// Check if the user already exists
	const existingUser = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});

	if (existingUser) {
		return NextResponse.json("Email already exists", { status: 400 });
	}

	// Check if the client exists
  const clientId = client ? parseInt(client) : null;
  if (clientId) {
    const existingClient = await prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!existingClient) {
      return NextResponse.json("Client not found", { status: 400 });
    }
  }

	// Hash the password
	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = await prisma.user.create({
		data: {
			firstname,
			surname,
			name: `${firstname} ${surname}`,
			email,
			hashedPassword,
			clientId,
			role,
		},
	});

	return NextResponse.json(newUser, { status: 201 });
}
