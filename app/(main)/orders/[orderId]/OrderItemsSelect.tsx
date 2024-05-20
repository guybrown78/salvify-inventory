'use client'

import { Item } from '@prisma/client'
import { Box, Flex, Text } from '@radix-ui/themes'
import { useState } from 'react'
import AddItemToOrder from './AddItemToOrder'


interface Props{
	items: Item[]
	orderId: number
	clientId: number
}


const OrderItemsSelect = ({ orderId, items, clientId }:Props) => {

	const [selectedItem, setSelectedItem] = useState<Item | null>(null)

	const onSelectedItem = (itemId:number) => {
		const item = items.filter(item => item.id === itemId)[0]
		setSelectedItem(item || null)
	}


	return (
		<Flex direction="column" gap="5">
			<Box>
				<Text size="2">Item the instance is from</Text>
				<select
					className="block w-full rounded-md border-0 py-2 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-grass-600 sm:text-md sm:leading-6"
					onChange={(e) =>  onSelectedItem(parseInt(e.target.value))}
				>
					<option className='text-base-accent' value="">Select an Item</option>
					{
						items.map(item => <option key={item.id} value={item.id}>{item.title}</option>)
					}
				</select>
			</Box>

			<AddItemToOrder 
				item={selectedItem} 
				orderId={orderId} 
				clientId={clientId}
				onItemAdded={() => setSelectedItem(null)}
			/>
		</Flex>

	)
}

export default OrderItemsSelect