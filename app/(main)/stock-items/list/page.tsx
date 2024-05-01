import { NoDataMessage } from '@/app/_components'
import prisma from '@/prisma/client'
import { Flex } from '@radix-ui/themes'
import StockTable from './StockTable'
import StockToolbar from './StockToolbar'
import axios from 'axios';

import { getSessionUser } from '@/app/_utils/getSessionUser'

const StockItemsPage = async () => {

	const sessionUser = await getSessionUser();

	// Check if sessionUser is null or undefined
  if (!sessionUser) {
    // Handle the case where sessionUser is not available
    return (
      <Flex direction="column" gap="3">
        <NoDataMessage>
          Session user data is not available
        </NoDataMessage>
      </Flex>
    );
  }


	// const items = await prisma.item?.findMany({ orderBy: { title: 'asc'} })
  const items = await prisma.item?.findMany({
    where: { clientId: sessionUser!.clientId! }, 
    orderBy: { title: 'asc' },
  });

	if(!items || !items.length)
		return (
			<Flex direction="column" gap="3">
				<StockToolbar />
				<NoDataMessage>
					There are currently no stock items in the system
				</NoDataMessage>
			</Flex>
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