import { NoDataMessage } from '@/app/_components'
import prisma from '@/prisma/client'
import { Flex } from '@radix-ui/themes'
import StockTable from './StockTable'
import StockToolbar from './StockToolbar'

const StockItemsPage = async () => {

	const items = await prisma.item?.findMany({ orderBy: { title: 'asc'} })
	
	if(!items || !items.length)
		return (
			<NoDataMessage>
				There are currently no stock items in the system
			</NoDataMessage>
		);

	const itemsCount = await prisma.item?.count()
	return (
		<Flex direction="column" gap="3">
			<StockToolbar />
			<StockTable items={items} />
		</Flex>
	)
}

export default StockItemsPage