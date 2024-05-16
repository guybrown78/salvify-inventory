import React from 'react'
import { IssueStatusBadge } from '@/app/_components';
import { Order } from '@prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';
import OrderStatusBadge from '@/app/_components/order/OrderStatusBadge';
import OrderStatusSelect from './OrderStatusSelect';

const OrderDetails = ({ order }: { order: Order }) => {
	return (
		<>
			<Heading>{`Order #${order.orderNumber}`}</Heading>
			<Heading size="2">{order.title}</Heading>
			<Flex gap='3' my="2">
				<OrderStatusSelect order={order} />
				<Text>{order.createdAt.toDateString()}</Text> 
			</Flex>
			<Card className='prose max-w-full' mt="4">
				{/* <ReactMarkdown>{order.notes || ""}</ReactMarkdown> */}
			</Card>
		</>
	)
}

export default OrderDetails