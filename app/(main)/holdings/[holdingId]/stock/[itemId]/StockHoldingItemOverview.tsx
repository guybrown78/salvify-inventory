import { ItemWithInstancesHoldingItems } from '@/app/_types/types';
import { HoldingItem } from '@prisma/client';
import { Flex, Text, Box } from '@radix-ui/themes'
import React from 'react'
import { HiExclamationTriangle } from "react-icons/hi2";

interface Props {
	item:ItemWithInstancesHoldingItems
	holdingId:number
}
export const StockHoldingItemOverview = ({ item, holdingId }:Props) => {

	const holdingItem:HoldingItem | null = item.holdingItems?.filter(holdingItem => holdingItem.holdingId === holdingId)[0] ?? null;

	if(!holdingItem){
		return null;
	}

	let total = 0;
	item.instances?.forEach(instance => total += instance.quantity) 

	return (
		<Flex>
			<Flex className='bg-red-50 rounded-xl' p="3" gap="3" align="center">
				<HiExclamationTriangle className='text-4xl text-red-600' />
				<Box>
					<Text color='red' size="3" as='p'>This Item ({item.title}) is required in this holding.</Text>
					{
						(holdingItem.requiredMinCount !== null && holdingItem.requiredMinCount > 0) && (
							<Text color='red' size="2" as='p'>
								The stock count is currently <strong>{total}</strong> and the minimum required amount is <strong>{holdingItem.requiredMinCount!}</strong>.
							</Text>
						)
					} 
					<Text color='red' size="2" as='p'>Add Instances to meet the required stock level.</Text>
				</Box>
	
			</Flex>
		</Flex>
	)
}
