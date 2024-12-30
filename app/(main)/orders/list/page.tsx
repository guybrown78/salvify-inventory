import { NoDataMessage, Pagination } from "@/app/_components";
import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { orderStatusValues } from "@/prisma/enums";
import { Prisma } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import OrderTable, { OrderQuery, columnNames } from "./OrderTable";
import OrderToolbar from "./OrderToolbar";

interface Props {
	searchParams: OrderQuery;
}

const OrdersPage = async ({ searchParams }: Props) => {
	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		// Handle the case where session.user is not available
		return (
			<Flex direction="column" gap="3">
				<NoDataMessage>Session user data is not available</NoDataMessage>
			</Flex>
		);
	}

	const status = orderStatusValues.includes(searchParams.status)
		? searchParams.status
		: undefined;
	const where = {
		status,
		clientId: session.user.clientId!,
	};

	const orderBy: Prisma.OrderOrderByWithRelationInput = columnNames.includes(
		searchParams.orderBy
	)
		? { [searchParams.orderBy]: "asc" as Prisma.SortOrder }
		: { orderNumber: "desc" as Prisma.SortOrder };

	const page = parseInt(searchParams.page) || 1;
	const pageSize = parseInt(searchParams.pageSize) || 20;

	const orders = await prisma.order?.findMany({
		where,
		orderBy,
		skip: (page - 1) * pageSize,
		take: pageSize,
		include: {
			orderItems: {
				include: {
					item: true,
				},
			},
		},
	});

	const orderCount = await prisma.order?.count({ where });

	if (!orders || !orders.length)
		return (
			<Flex direction="column" gap="3">
				<OrderToolbar />
				<NoDataMessage>
					There are currently no orders in the system{" "}
					{searchParams.status ? ` with status ${searchParams.status}` : ""}.
				</NoDataMessage>
				<Pagination
					itemCount={orderCount}
					pageSize={pageSize}
					currentPage={page}
				/>
			</Flex>
		);

	return (
		<Flex direction="column" gap="3">
			<OrderToolbar />
			<OrderTable searchParams={searchParams} orders={orders} />
			<Pagination
				itemCount={orderCount}
				pageSize={pageSize}
				currentPage={page}
			/>
		</Flex>
	);
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "Salvify Medical Inventory - Orders",
	description: "View all Inventory orders",
};

export default OrdersPage;
