import prisma from '@/prisma/client';
import { Box, Card, Flex, Grid, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import EditOrderButton from './EditOrderButton'
import { getSessionUser } from '@/app/_utils/getSessionUser';
import { NoDataMessage } from '@/app/_components';
import DeleteOrderButton from './DeleteOrderButton';
import AssignUserToOrder from './AssignUserToOrder';
import OrderDetails from './OrderDetails';
import ReactMarkdown from 'react-markdown';
interface Props {
	params: { orderId: string }
}


const fetchOrder = cache((orderId: number, clientId: number) => prisma.order
	.findUnique({
		where: { 
			id: orderId, 
			clientId: clientId 
		},
		include: {
			orderItems : true
		}
	})
);




const OrderDetailPage = async ({ params }:Props) => {

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

	const order = await fetchOrder(parseInt(params.orderId), sessionUser!.clientId!);

	if(!order)
		notFound();


	return (
		<Grid columns={{ initial: "1", sm: "7"}} gap="5" >
			<Box className='md:col-span-4'>
				<OrderDetails order={order} />
			</Box>	

			{sessionUser && (
			<Box className='md:col-span-3'>
				<Flex direction='column' gap="3">
					<Flex direction="column" gap="1">
						<Text size="2">Order Assigned to</Text>
						<AssignUserToOrder order={order} />
					</Flex>
					
					<Flex direction="column" gap="1">
						<Text size="2">Additional Notes</Text>
						<Card className='prose max-w-full'>
							<ReactMarkdown>{order.notes || ""}</ReactMarkdown>
						</Card>
					</Flex>


					<EditOrderButton orderId={order.id} status={order.status} />
					<DeleteOrderButton orderId={order.id}/>
				</Flex>
			</Box>)}
		</Grid>
	)
}

export default OrderDetailPage