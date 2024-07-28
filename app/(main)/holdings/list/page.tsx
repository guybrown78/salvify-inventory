import { Flex } from '@radix-ui/themes'
import React from 'react'
import HoldingsToolbar from './HoldingsToolbar'
import HoldingsTable, { HoldingQuery, columnNames } from './HoldingsTable'
import prisma from '@/prisma/client'
import { NoDataMessage, Pagination } from "@/app/_components";
import Main from '@/app/_components/layout/Main'
import { Metadata } from "next";
import { getSessionUser } from '@/app/_utils/getSessionUser'
import { holdingTypeList, holdingTypeValues } from '@/prisma/enums'

interface Props {
	searchParams: HoldingQuery;
}

const HoldingListPage = async ({ searchParams }: Props) => {

	const sessionUser = await getSessionUser();

	// Check if sessionUser is null or undefined
  if (!sessionUser) {
    // Handle the case where sessionUser is not available
    return (
			<Main>
				<Flex direction="column" gap="3">
					<NoDataMessage>
						Session user data is not available
					</NoDataMessage>
				</Flex>
			</Main>
    );
  }

	const type = holdingTypeValues.includes(searchParams.type)
	? searchParams.type
	: undefined;
	const where = {
		type,
		clientId: sessionUser!.clientId!,
	};

	const page = parseInt(searchParams.page) || 1;
	const pageSize = 20;

	const holdings = await prisma.holding?.findMany({ 
		where, 
		orderBy: { title: 'asc'},
		include: { locations: true } 
	});

	const holdingCount = await prisma.holding.count({ where });

	if(!holdings || !holdings.length)
		return (
			<Main>
				<Flex direction="column" gap="3">
					<HoldingsToolbar />
					<NoDataMessage>
						There are currently no holdings for { sessionUser!.clientName! }{ searchParams.type ? ` with type ${searchParams.type}` : "" }.
					</NoDataMessage>
				</Flex>
			</Main>
	);

	return (
		<Main>
			<Flex direction="column" gap="3">
				<HoldingsToolbar />
				<HoldingsTable searchParams={searchParams} holdings={holdings} />
				<Pagination
					itemCount={holdingCount}
					pageSize={pageSize}
					currentPage={page}
				/>
			</Flex>
		</Main>
	)
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: "Salvify Medical Inventory - Holdings",
	description: "View all Inventory holdings",
};
export default HoldingListPage