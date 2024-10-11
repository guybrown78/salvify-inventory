import { getSessionUser } from "@/app/_utils/getSessionUser";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
	req: NextRequest,
	{ params }: { params: { userId: string } }
) {

	const sessionUser = await getSessionUser();
	if (!sessionUser?.id) {
		return NextResponse.json("Unauthorized", { status: 401 });
	}

	const { userId } = params;
	const { newClientId } = await req.json();

	if (!newClientId) {
		return NextResponse.json("newClientId is required.", { status: 400 });
	}

	// Ensure the user making the request is the one trying to switch the client
	if (sessionUser.id !== userId) {
		return NextResponse.json(
			"Forbidden: Cannot switch client for another user.",
			{ status: 403 }
		);
	}

	try {
		// Fetch the user along with their optional clients
		const user = await prisma.user.findUnique({
			where: { id: userId },
			include: { optionalClients: true },
		});

		if (!user) {
			return NextResponse.json("User not found.", { status: 404 });
		}

		// Check if the new client ID is part of the user's optional clients
		const canSwitch = user.optionalClients.some(
			(client) => client.clientId === Number(newClientId)
		);

		if (!canSwitch) {
			return NextResponse.json("You do not have access to this client.", {
				status: 403,
			});
		}

		// Update the user's selected client
		await prisma.user.update({
			where: { id: userId },
			data: { clientId: Number(newClientId) },
		});

		return NextResponse.json("Client switched successfully.", { status: 200 });
	} catch (error) {
		console.error("Error switching client:", error);
		return NextResponse.json("Internal server error.", { status: 500 });
	}
}
