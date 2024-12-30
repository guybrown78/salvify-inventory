import authOptions from "@/app/auth/authOptions";
import { orderSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { OrderStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	if (!session.user.clientId) {
		return NextResponse.json("Cannot find session user client", {
			status: 400,
		});
	}

	const clientId = session.user.clientId!;

	const latestOrder = await prisma.order.findFirst({
		where: { clientId },
		orderBy: { orderNumber: "desc" },
	});

	// Calculate the next orderNumber
	const nextOrderNumber = latestOrder ? latestOrder.orderNumber + 1 : 1;

	const body = await request.json();
	const validation = orderSchema.safeParse(body);
	if (!validation.success) {
		return NextResponse.json(validation.error.format(), { status: 400 });
	}

	const newOrder = await prisma.order.create({
		data: {
			title: body.title,
			notes: body.notes,
			orderNumber: nextOrderNumber,
			assignedToUserId: session.user.id,
			clientId: clientId,
		},
	});
	return NextResponse.json(newOrder, { status: 201 });
}

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
		statusFilter = [OrderStatus.OPEN]; // Default to OPEN if no valid statuses are provided
	}

	// Find all orders with the specified status for the user's client
	const orders = await prisma.order.findMany({
		where: {
			clientId: session.user.clientId!,
			status: { in: statusFilter },
		},
		include: {
			orderItems: true, // Include order item details
		},
	});

	return NextResponse.json(orders, { status: 200 });
}
