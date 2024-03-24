import { Flex } from '@radix-ui/themes'
import React from 'react'
import HoldingsToolbar from './HoldingsToolbar'
import HoldingsTable from './HoldingsTable'
import prisma from '@/prisma/client'
import { NoDataMessage } from '@/app/_components'
import Main from '@/app/_components/layout/Main'

const HoldingListPage = async () => {

	const holdings = await prisma.holding?.findMany({ orderBy: { title: 'asc'} });

	if(!holdings || !holdings.length)
		return (
			<Main>
				<Flex direction="column" gap="3">
					<HoldingsToolbar />
					<NoDataMessage>
						There are currently no holdings in the system
					</NoDataMessage>
				</Flex>
			</Main>
	);

	return (
		<Main>
			<Flex direction="column" gap="3">
				<HoldingsToolbar />
				<HoldingsTable holdings={holdings} />
			</Flex>
		</Main>
	)
}

export const dynamic = 'force-dynamic';

export default HoldingListPage