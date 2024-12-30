import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	if (!session.user.clientId) {
		return NextResponse.json("Cannot find session user client", {
			status: 400,
		});
	}

	const clientId = session.user.clientId;
	if (!clientId) {
		return NextResponse.json("No client assigned to the user", { status: 400 });
	}

	try {
		const users = await prisma.user.findMany({
			where: { clientId },
			orderBy: { name: "asc" },
		});

		// Step 5: Return the filtered users
		return NextResponse.json(users);
	} catch (error) {
		console.error("Error fetching users:", error);
		return NextResponse.json("Failed to fetch users", { status: 500 });
	}
}
