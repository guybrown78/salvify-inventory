import dynamic from 'next/dynamic'
import OrderFormSkeleton from '../../_components/OrderFormSkeleton'
import { getSessionUser } from '@/app/_utils/getSessionUser';
import { NoDataMessage } from '@/app/_components';
import { Flex } from '@radix-ui/themes';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';

interface Props {
	params: { orderId: string }
}

const OrderForm = dynamic(
	() => import('../../_components/OrderForm'),
	{
		ssr: false,
		loading: () => <OrderFormSkeleton />
	}
)

const EditOrderPage = async ({ params }:Props) => {

	const sessionUser = await getSessionUser();	

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

	const order = await prisma.order.findUnique({
		where: { 
			id: parseInt(params.orderId),
			clientId: sessionUser!.clientId!
		},
		include: {
			orderItems : true
		}
	})

	if(!order) notFound(); 

	return (
		<OrderForm order={order}/>
	)
}

export default EditOrderPage