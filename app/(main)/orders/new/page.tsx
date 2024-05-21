import dynamic from 'next/dynamic'
import OrderFormSkeleton from '../_components/OrderFormSkeleton'
import { NoDataMessage } from '@/app/_components';
import { Flex } from '@radix-ui/themes';
import { getSessionUser } from '@/app/_utils/getSessionUser';
import prisma from '@/prisma/client';

const OrderForm = dynamic(
	() => import('../_components/OrderForm'),
	{
		ssr: false,
		loading: () => <OrderFormSkeleton />
	}
)

const NewOrderPage = async () => {

	// const session = await getServerSession(authOptions)
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

	const latestOrder = await prisma.order.findFirst({
    where: { clientId: sessionUser!.clientId },
    orderBy: { orderNumber: 'desc' },
  });

	// Calculate the next orderNumber
  const nextOrderNumber = latestOrder ? latestOrder.orderNumber + 1 : 1;

	return (
		<OrderForm nextOrderNumber={nextOrderNumber} />
	)
}

export default NewOrderPage