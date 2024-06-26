import LabelValueColumn from '@/app/_components/LabelValueColumn'
import LabelValueRow from '@/app/_components/LabelValueRow'
import StockItemAddToOrderButton from '@/app/_components/item/StockItemAddToOrderButton'
import { ItemWithInstancesHoldingItems } from '@/app/_types/types'
import { calculateItemInstanceTotal } from '@/app/_utils/itemInstanceTotalCount'
import { Card, Flex, Text } from '@radix-ui/themes'
import React from 'react'
import StockInstanceTable from '../stock/[itemId]/StockInstanceTable'
const moment = require('moment');

interface Props {
	item: ItemWithInstancesHoldingItems
}
const ExpiringItem = ({ item }: Props) => {

	const expiryDates:any[] = item.instances ? item.instances.map(instance => instance.expiryDate).filter(date => date !== null) : [];

  const sortedExpiryDates = expiryDates.sort((a:any, b:any) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA.getTime() - dateB.getTime();
  });

	const nearestExpiryDate = sortedExpiryDates.length > 0 ? sortedExpiryDates[0] : null;
  const nearestDate = nearestExpiryDate ? moment(nearestExpiryDate) : null;

  const daysBeforeExpiry = nearestDate ? nearestDate.diff(moment(), 'days') : null;


	const dateText:string = nearestDate ? nearestDate.format('Do MMM YYYY') : 'N/A'
	const countText:string = daysBeforeExpiry !== null ? daysBeforeExpiry : 'N/A';

	return (
		<Card>
			<Flex direction="column" gap="3">
				<Flex justify="between" align="center">
					<LabelValueColumn label="Item">
						<Text weight="bold">{item.title}</Text>
					</LabelValueColumn>

					<div className="hidden md:table-cell">
						<LabelValueColumn label="Nearest Expiry Date:">
							<Text size='5' weight='bold'>{dateText}</Text>
						</LabelValueColumn>
					</div>
				
					<div className="hidden md:table-cell">
						<LabelValueColumn label="Number of days before expire date:">
							<Text size='5' color='red' weight='bold'>
								{countText}
							</Text>
						</LabelValueColumn>
					</div>

					

					<StockItemAddToOrderButton title={item.title} itemId={item.id} />
				</Flex>

				<div className="block md:hidden">
					<Flex gap="5" align="center" >
						<LabelValueColumn label="Nearest Expiry Date:">
							<Text size='3' weight='bold'>{dateText}</Text>
						</LabelValueColumn>
						<LabelValueColumn label="Number of days before expire date:">
							<Text size='3' color='red' weight='bold'>
								{countText}
							</Text>
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

export default ExpiringItem