
import { NoDataMessage, Pagination } from '@/app/_components'
import prisma from '@/prisma/client'
import { Flex } from '@radix-ui/themes'
import StockTable, { ItemQuery, columnNames } from './StockTable'
import StockToolbar from './StockToolbar'
import axios from 'axios';

import { getSessionUser } from '@/app/_utils/getSessionUser'
import { Prisma } from '@prisma/client'
// import { useState } from 'react'
interface Props {
	searchParams: ItemQuery;
}


const StockItemsPage = async ({ searchParams }: Props) => {

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

	const where = {
		clientId: sessionUser!.clientId!,
	};
	const orderBy: Prisma.ItemOrderByWithRelationInput = columnNames.includes(searchParams.orderBy)
		? { [searchParams.orderBy]: "asc" as Prisma.SortOrder }
		: { title: "asc" as Prisma.SortOrder };


	const page = parseInt(searchParams.page) || 1;
	const pageSize = 20;
	// const items = await prisma.item?.findMany({ orderBy: { title: 'asc'} })
  const items = await prisma.item?.findMany({
    where, 
    orderBy,
		skip: (page - 1) * pageSize,
		take: pageSize
  });


	const setPageSize = (pageSize:number) => {
		console.log("page size", pageSize)
	}

	if(!items || !items.length)
		return (
			<Flex direction="column" gap="3">
				<StockToolbar />
				<NoDataMessage>
					There are currently no stock items in the system
				</NoDataMessage>
			</Flex>
		);

	const itemsCount = await prisma.item?.count({ where })

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
	)
}

export default StockItemsPage