import prisma from '@/prisma/client';
import { Box, Card, Flex, Grid, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import EditOrderButton from './EditOrderButton'
import { NoDataMessage } from '@/app/_components';
import DeleteOrderButton from './DeleteOrderButton';
import AssignUserToOrder from './AssignUserToOrder';
import OrderDetails from './OrderDetails';
import ReactMarkdown from 'react-markdown';
import authOptions from '@/app/auth/authOptions';
import { getServerSession } from 'next-auth';
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
			orderItems : {
				include: {
					item: true
				}
			}
		}
	})
);




const OrderDetailPage = async ({ params }:Props) => {

	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		// Handle the case where session.user is not available
		return (
			<Flex direction="column" gap="3">
				<NoDataMessage>Session user data is not available</NoDataMessage>
			</Flex>
		);
	}

	const order = await fetchOrder(parseInt(params.orderId), session.user.clientId!);

	if(!order)
		notFound();


	return (
		<Grid columns={{ initial: "1", sm: "7"}} gap="5" >
			<Box className='md:col-span-4'>
				<OrderDetails order={order} />
			</Box>	

			{session.user && (
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

export const dynamic = 'force-dynamic';

export default OrderDetailPage