import { Order, OrderStatus } from '@prisma/client';
import { Link } from '@/app/_components';
import React from 'react'
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Table, TableCell, TableColumnHeaderCell } from '@radix-ui/themes';
import NextLink from 'next/link';
import OrderStatusBadge from '@/app/_components/order/OrderStatusBadge';

export interface OrderQuery {
	status: OrderStatus
	orderBy: keyof Order;
	page: string;
}
interface Props {
	searchParams: OrderQuery,
	orders:Order[]
}

const OrderTable = ({ searchParams, orders }: Props) => {
	return (
		<Table.Root variant='surface'>
			<Table.Header>
				<Table.Row>
					{columns.map((column) => (
						<TableColumnHeaderCell 
							key={column.value} 
							className={column.className}
						>
							<NextLink href={{
								query: { 
									...searchParams, 
									orderBy:column.value
								}
							}}>
								{column.label}
							</NextLink>
							{column.value === searchParams.orderBy && <ArrowUpIcon className="inline" />}
						</TableColumnHeaderCell>
					))}
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{orders.map(order => (
					<Table.Row key={order.id}>
						<TableCell>
							<Link href={`/orders/${order.id}`}>
								{`Order #${order.orderNumber}`}
							</Link>	
						</TableCell>
						<TableCell className='hidden md:table-cell'>
							<OrderStatusBadge orderStatus={order.status} />
						</TableCell>
						<TableCell className='hidden md:table-cell'>{order.createdAt.toDateString()}</TableCell>
					</Table.Row>
				))}
			</Table.Body>
		</Table.Root>
	)
}

const columns:{ 
	label:string, 
	value: keyof Order,
	className?:string
}[] = [
	{ label: 'Order', value: 'orderNumber'},
	{ label: 'Status', value: 'status', className:'hidden md:table-cell'},
	{ label: 'Created', value: 'createdAt', className:'hidden md:table-cell'},
]

export const columnNames = columns.map(column => column.value);
export default OrderTable