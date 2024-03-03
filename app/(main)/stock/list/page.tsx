import { NoDataMessage } from '@/app/_components'
import prisma from '@/prisma/client'
import { Container, Text } from '@radix-ui/themes'
import React from 'react'

const StockItemsPage = async () => {

	const items = await prisma.item?.findMany({ orderBy: { title: 'asc'} })
	// const itemsCount = await prisma.item?.count()
	console.log("items", items)
	if(!items)
		return (<NoDataMessage>There are currently no stock items in the system</NoDataMessage>)
	return (
		<div>StockItemsPage</div>
	)
}

export default StockItemsPage