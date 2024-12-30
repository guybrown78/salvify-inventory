import { NoDataMessage, Pagination } from "@/app/_components";
import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import StockTable, { ItemQuery, columnNames } from "./StockTable";
import StockToolbar from "./StockToolbar";

import authOptions from "@/app/auth/authOptions";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
// import { useState } from 'react'
interface Props {
	searchParams: ItemQuery;
}

const StockItemsPage = async ({ searchParams }: Props) => {
	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		// Handle the case where session.user is not available
		return (
			<Flex direction="column" gap="3">
				<NoDataMessage>Session user data is not available</NoDataMessage>
			</Flex>
		);
	}

	const where = {
		clientId: session.user.clientId!,
	};
	const orderBy: Prisma.ItemOrderByWithRelationInput = columnNames.includes(
		searchParams.orderBy
	)
		? { [searchParams.orderBy]: "asc" as Prisma.SortOrder }
		: { title: "asc" as Prisma.SortOrder };

	const page = parseInt(searchParams.page) || 1;
	const pageSize = parseInt(searchParams.pageSize) || 20;
	// const items = await prisma.item?.findMany({ orderBy: { title: 'asc'} })
	const items = await prisma.item?.findMany({
		where,
		orderBy,
		skip: (page - 1) * pageSize,
		take: pageSize,
	});

	const setPageSize = (pageSize: number) => {
		console.log("page size", pageSize);
	};

	const itemsCount = await prisma.item?.count({ where });

	if (!items || !items.length)
		return (
			<Flex direction="column" gap="3">
				<StockToolbar />
				<NoDataMessage>
					There are currently no stock items in the system
				</NoDataMessage>
				<Pagination
					itemCount={itemsCount}
					pageSize={pageSize}
					currentPage={page}
					// setPageSize={(num) => console.log(num)}
				/>
			</Flex>
		);

	return (
		<Flex direction="column" gap="3">
			<StockToolbar />
			<StockTable items={items} searchParams={searchParams} />
			<Pagination
				itemCount={itemsCount}
				pageSize={pageSize}
				currentPage={page}
				// setPageSize={(num) => console.log(num)}
			/>
		</Flex>
	);
};

export default StockItemsPage;
