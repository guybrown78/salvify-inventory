import { ItemWithInstancesHoldingItems } from '@/app/_types/types';
import { calculateItemInstanceTotal } from '@/app/_utils/itemInstanceTotalCount';
import { Text, Flex } from '@radix-ui/themes';
import React from 'react'
import { FaArrowDown } from 'react-icons/fa6';


interface Props {
	item: ItemWithInstancesHoldingItems;
}

interface ReqAmountProps {
	requiredMinCount:number;
	instanceCount:number;
	total:number;
}
const RequiredAmount = ({requiredMinCount, instanceCount, total}: ReqAmountProps) => {
	return (
		<Flex gap="1" align="center">
			{
				requiredMinCount > total && (<FaArrowDown className='fill-red-700'/>)
			}
			<Text color={requiredMinCount > total ? "red" : "green"}>
				{requiredMinCount}
			</Text>
		</Flex>
		
	)
}
const StockItemHoldingReqAmount = ({item}: Props) => {
	const total:number = calculateItemInstanceTotal(item);

	if(item.holdingItems && item.holdingItems.length){
		 return ( 
		 	<RequiredAmount 
				requiredMinCount={item.holdingItems[0].requiredMinCount ?? 0}
				total={total}
				instanceCount={item.instances?.length || 0}
			/>)
	}

	return (
		<span>-</span>
	)
}

export default StockItemHoldingReqAmount