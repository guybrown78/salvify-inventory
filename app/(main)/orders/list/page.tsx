import { NoDataMessage, Pagination } from "@/app/_components";
import { getSessionUser } from "@/app/_utils/getSessionUser";
import prisma from "@/prisma/client";
import { orderStatusValues } from "@/prisma/enums";
import { Flex } from "@radix-ui/themes";
import OrderTable, { OrderQuery, columnNames } from "./OrderTable";
import OrderToolbar from "./OrderToolbar";
import { Prisma } from "@prisma/client";
import { Metadata } from "next";

interface Props {
	searchParams: OrderQuery;
}

const OrdersPage = async ({ searchParams }: Props) => {
	const sessionUser = await getSessionUser();

	// Check if sessionUser is null or undefined
	if (!sessionUser) {
		// Handle the case where sessionUser is not available
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
		clientId: sessionUser!.clientId!,
	};

	const orderBy: Prisma.OrderOrderByWithRelationInput = columnNames.includes(searchParams.orderBy)
		? { [searchParams.orderBy]: "asc" as Prisma.SortOrder }
		: { orderNumber: "desc" as Prisma.SortOrder };

	const page = parseInt(searchParams.page) || 1;
	const pageSize = 10;

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

	const orderCount = await prisma.order.count({ where });

	if (!orders || !orders.length)
		return (
			<Flex direction="column" gap="3">
				<OrderToolbar />
				<NoDataMessage>
					There are currently no orders in the system
				</NoDataMessage>
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
