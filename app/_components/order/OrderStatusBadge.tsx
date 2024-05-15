import React from 'react'
import { OrderStatus } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import { orderStatusMap } from '@/prisma/enums'

// const orderStatusMap: Record<
// 	OrderStatus, 
// 	{ label:string, color: 'orange' | 'plum' | 'tomato' | 'violet' | 'mint' }
// 	> = {
// 		OPEN: { label: 'Open', color: 'orange' },
// 		ORDERED: { label: 'Ordered', color: 'plum' },
// 		RECEIVED: { label: 'Recieved', color: 'violet' },
// 		COMPLETE: { label: 'Complete', color: 'mint' },
// 		CLOSED: { label: 'Closed', color: 'tomato' }
// 	}

const OrderStatusBadge = ({ orderStatus }: { orderStatus: OrderStatus  }) => {
	return (
		<Badge color={orderStatusMap[orderStatus].color}>
			{ orderStatusMap[orderStatus].label }
		</Badge>
	)
}

export default OrderStatusBadge