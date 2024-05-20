import React from 'react'
import { IssueStatusBadge } from '@/app/_components';
import { Order } from '@prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';
import OrderStatusBadge from '@/app/_components/order/OrderStatusBadge';
import OrderStatusSelect from './OrderStatusSelect';
import OrderItems from './OrderItems';
import { OrderWithItems } from '@/app/_types/types';

const OrderDetails = ({ order }: { order: OrderWithItems }) => {


	return (
		<>
			<Heading>{`Order #${order.orderNumber}`}</Heading>
			<Heading size="2">{order.title}</Heading>
			<Flex gap='3' my="2">
				<OrderStatusSelect order={order} />
				<Text>{order.createdAt.toDateString()}</Text> 
			</Flex>
			<Card className='prose max-w-full' mt="4" variant='ghost'>
				<OrderItems order={order}/>
			</Card>
		</>
	)
}

export default OrderDetails