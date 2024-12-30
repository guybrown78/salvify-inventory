import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { OrderStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	if (!session.user.clientId) {
		return NextResponse.json("Cannot find session user client", {
			status: 400,
		});
	}

	// Extract itemId from params and parse it
	const itemId = parseInt(params.id);
	if (isNaN(itemId)) {
		return NextResponse.json("Invalid item ID", { status: 400 });
	}

	// Parse URL and get the query parameters for statuses
	const url = new URL(request.url);
	const statusParams = url.searchParams.getAll("status");

	// Validate the parsed statuses against the OrderStatus enum
	const validStatuses: OrderStatus[] = statusParams.filter((status) =>
		Object.values(OrderStatus).includes(status as OrderStatus)
	) as OrderStatus[];

	// Define the filter for order status
	let statusFilter: OrderStatus[];
	if (validStatuses.length > 0) {
		statusFilter = validStatuses;
	} else {
		statusFilter = [OrderStatus.OPEN, OrderStatus.ORDERED]; // Default to OPEN and ORDERED if no valid statuses are provided
	}

	// Find orders with the specified status for the current user's client that contain the specified item
	const orders = await prisma.order.findMany({
		where: {
			clientId: session.user.clientId!,
			status: { in: statusFilter },
			orderItems: {
				some: {
					itemId: itemId,
				},
			},
		},
		include: {
			orderItems: true, // Include order item details
		},
	});

	return NextResponse.json(orders, { status: 200 });
}
