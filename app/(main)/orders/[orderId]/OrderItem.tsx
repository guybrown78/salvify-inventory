
'use client'
import { Spinner, StockItemCategoryBadge, StockItemGroupingBadge, StockItemTypeBadge } from '@/app/_components';
import { Item } from '@prisma/client';
import { Box, Button, Card, Flex, Text, TextField } from '@radix-ui/themes';
import React, { useState } from 'react'
import { addOrderItemSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { OrderItemWithItem } from '@/app/_types/types'

interface Props {
	orderId: number,
	orderItem: OrderItemWithItem
}



const OrderItem = ({orderId, orderItem}:Props ) => {

	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	return (
		<Card className='max-w-full' mt="4">
			{/* <form onSubmit={onSubmit}> */}
				<Flex direction="column" gap="2">
					<Text size="2">{orderItem.item.title}</Text>
					<Flex gap="1">
						<StockItemTypeBadge itemType={orderItem.item.type} />
						<StockItemCategoryBadge itemCategory={orderItem.item.category} />
						<StockItemGroupingBadge itemGrouping={orderItem.item.grouping} />
					</Flex>
					<Flex align="end" justify="between">
						<Flex align="center" gap="2">
							<Text size="2">Quantity</Text>
							<TextField.Root>
								<TextField.Input 
									type="number" 
									min={1}
									defaultValue={orderItem.quantity}
									disabled={isSubmitting}
								/>
							</TextField.Root>
						</Flex>
						{/* <Button type="submit" disabled={isSubmitting}>
							{ isSubmitting ? 'Adding to Order' : 'Add to Order' }{' '}
							{isSubmitting && <Spinner />}
						</Button> */}
					</Flex>
				</Flex>
			{/* </form> */}
		</Card>
		
	)
}

export default OrderItem