import { Flex } from '@radix-ui/themes'
import React from 'react'
import HoldingsToolbar from './HoldingsToolbar'
import HoldingsTable from './HoldingsTable'
import prisma from '@/prisma/client'
import { NoDataMessage } from '@/app/_components'

const HoldingListPage = async () => {

	const holdings = await prisma.holding?.findMany({ orderBy: { title: 'asc'} });

	if(!holdings || !holdings.length)
		return (
			<Flex direction="column" gap="3">
				<HoldingsToolbar />
				<NoDataMessage>
					There are currently no holdings in the system
				</NoDataMessage>
			</Flex>
	);

	return (
		<Flex direction="column" gap="3">
			<HoldingsToolbar />
			<HoldingsTable holdings={holdings} />
		</Flex>
	)
}

export default HoldingListPage