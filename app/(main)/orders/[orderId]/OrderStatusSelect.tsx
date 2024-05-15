'use client'

import Skeleton from '@/app/_components/Skeleton'
import OrderStatusBadge from '@/app/_components/order/OrderStatusBadge'
import { orderStatusList } from '@/prisma/enums'
import { Order, OrderStatus } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'


const OrderStatusSelect = ({ order }: { order: Order }) => {

	const updateOrderStatus = (orderStatus:OrderStatus) => {
		console.log(">", orderStatus);
		axios
			.patch('/api/orders/' + order.id, { 
				status: orderStatus 
			})
			.catch(() => {
				toast.error("Changes could not be saved")
			})
	}

	console.log(orderStatusList)
	return (
		<>
			<Select.Root 
				defaultValue={order.status}
				onValueChange={updateOrderStatus}>
				<Select.Trigger variant='soft' />
				<Select.Content variant='soft'>
					<Select.Group>
						<Select.Label>Order Status</Select.Label>
						{
							orderStatusList.map(status => (
								<Select.Item 
									key={status.value}
									value={status.value}
								>
									<OrderStatusBadge orderStatus={status.value as OrderStatus}/>
								</Select.Item>
							))
						}
					</Select.Group>
				</Select.Content>
			</Select.Root>
			<Toaster />
		</>
	)
}

export default OrderStatusSelect