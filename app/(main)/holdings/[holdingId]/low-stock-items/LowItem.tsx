import LabelValueColumn from '@/app/_components/LabelValueColumn'
import LabelValueRow from '@/app/_components/LabelValueRow'
import StockItemAddToOrderButton from '@/app/_components/item/StockItemAddToOrderButton'
import { ItemWithInstancesHoldingItems } from '@/app/_types/types'
import { calculateItemInstanceTotal } from '@/app/_utils/itemInstanceTotalCount'
import { Card, Flex, Text } from '@radix-ui/themes'
import React from 'react'
import StockInstanceTable from '../stock/[itemId]/StockInstanceTable'

interface Props {
	item: ItemWithInstancesHoldingItems
}

const LowItem = ({ item }: Props) => {

	const min:number = item.holdingItems ? item.holdingItems[0].requiredMinCount ?? 0 : 0;
	const total:number = calculateItemInstanceTotal(item);
	const diff:number = min - total;
	return (
		<Card>
			<Flex direction="column" gap="3">
				<Flex justify="between" align="center">
					<LabelValueColumn label="Item">
						<Text weight="bold">{item.title}</Text>
					</LabelValueColumn>

					<div className="hidden md:table-cell">
						<LabelValueColumn label="Total Stock Required:">
							<Text size='5' weight='bold'>{min}</Text>
						</LabelValueColumn>
					</div>
				
					<div className="hidden md:table-cell">
						<LabelValueColumn label="Total Stock Quantity:">
							<Text size='5' color='amber' weight='bold'>
								{total}
							</Text>
						</LabelValueColumn>
					</div>

					<div className="hidden md:table-cell">
						<LabelValueColumn label="Increase Stock By:">
							<Text size='5' weight='bold' as="div">{diff} <span className='font-normal text-sm'>(min)</span></Text>
						</LabelValueColumn>
					</div>
					

					<StockItemAddToOrderButton title={item.title} itemId={item.id} />
				</Flex>

				<div className="block md:hidden">
					<Flex gap="5" align="center" >
						<LabelValueColumn label="Total Stock Required:">
							<Text size='3' weight='bold'>{min}</Text>
						</LabelValueColumn>
						<LabelValueColumn label="Total Stock Quantity:">
							<Text size='3' color='amber' weight='bold'>
								{total}
							</Text>
						</LabelValueColumn>
						<LabelValueColumn label="Increase Stock By:">
							<Text size='5' weight='bold' as="div">{diff} <span className='font-normal text-sm'>(min)</span></Text>
						</LabelValueColumn>
					</Flex>
				</div>


				<div className="flex justify-between border-t border-slate-200 my-3" />
				<Text size="2">{item.instances?.length ? 'Current instances in holding' : ''}</Text>
				<StockInstanceTable item={item} />
				
			</Flex>
			
		</Card>
		
	)
}

export default LowItem