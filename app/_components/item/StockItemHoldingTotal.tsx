import { ItemWithInstancesHoldingItems } from '@/app/_types/types';
import { calculateItemInstanceTotal } from '@/app/_utils/itemInstanceTotalCount';
import { Text, Flex } from '@radix-ui/themes';
import React from 'react'
import { FaArrowDown } from 'react-icons/fa6';

interface Props {
	item: ItemWithInstancesHoldingItems;
}


const StockItemHoldingTotal = ({item}: Props) => {

	const total:number = calculateItemInstanceTotal(item);

	if(item.holdingItems && item.holdingItems.length){
		const requiredMinCount = item.holdingItems[0].requiredMinCount ?? 0
		return ( 
			<Flex gap="1" align="center">
				{
					requiredMinCount > total && (<FaArrowDown className='fill-red-700'/>)
				}
				<Text color={requiredMinCount > total ? "red" : "green"}>
					{total}
				</Text>
			</Flex>
		)
 }

	return (
		<Flex gap="1" align="center">
			<Text>
				{total}
			</Text>
		</Flex>
	)
}

export default StockItemHoldingTotal