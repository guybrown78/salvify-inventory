import { NoDataMessage } from '@/app/_components'
import prisma from '@/prisma/client'
import { Container, Flex, Text } from '@radix-ui/themes'
import React from 'react'
import StockTable from './StockTable'

const StockItemsPage = async () => {

	const items = await prisma.item?.findMany({ orderBy: { title: 'asc'} })
	
	console.log("items", items)
	if(!items)
		return (
			<NoDataMessage>
				There are currently no stock items in the system
			</NoDataMessage>
		);

	const itemsCount = await prisma.item?.count()
	return (
		<Flex direction="column" gap="3">
			<StockTable items={items} />
		</Flex>
	)
}

export default StockItemsPage