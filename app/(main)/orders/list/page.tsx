import React from 'react'
import { NoDataMessage } from '@/app/_components'
import prisma from '@/prisma/client'
import { Flex } from '@radix-ui/themes'
import { getSessionUser } from '@/app/_utils/getSessionUser'
import OrderToolbar from './OrderToolbar'

const OrdersPage = async () => {

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

  const orders = await prisma.order?.findMany({
    where: { clientId: sessionUser!.clientId! }, 
    orderBy: { orderNumber: 'asc' },
  });

	if(!orders || !orders.length)
		return (
			<Flex direction="column" gap="3">
				<OrderToolbar />
				<NoDataMessage>
					There are currently no orders in the system
				</NoDataMessage>
			</Flex>
		);


	return (
		<div>OrdersPage</div>
	)
}

export default OrdersPage