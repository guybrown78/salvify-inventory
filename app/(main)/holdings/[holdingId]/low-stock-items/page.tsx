import { notFound } from 'next/navigation';
import HoldingHeader from '../HoldingHeader';
import { HoldingPageProps, fetchHolding } from '../holdingQuery';
import { calculateItemInstanceTotal } from '@/app/_utils/itemInstanceTotalCount';
import { ItemWithInstancesHoldingItems } from '@/app/_types/types';
import { Box, Flex, Heading, Text } from '@radix-ui/themes';
import LowItem from './LowItem';
import prisma from "@/prisma/client";
const HoldingLowStockItemsPage = async ({ params }: HoldingPageProps) => {
	const holding = await fetchHolding(parseInt(params.holdingId))

	if(!holding)
		notFound();
	
	const holdingItemQuery: any = {
		holding: {
			id: holding.id,
		},
	};

	const whereClause: any = {
		OR: [
			{
				instances: {
					some: {
						location: {
							holding: {
								id: holding.id,
							},
						},
					},
				},
			},
			{
				holdingItems: {
					some: holdingItemQuery,
				},
			}
		],
	};

	const itemsInHoldingAndLocation:ItemWithInstancesHoldingItems[] = await prisma.item.findMany({
		where: whereClause,
		include: {
			instances: {
				where: {
					location: {
						holding: {
							id: holding.id,
						},
					},
				},
				include: {
					location: true,
				},
			},
			holdingItems: {
				where: {
					holding: {
						id: holding.id,
					},
				},
			},
		},
	});



	const lowItems = await itemsInHoldingAndLocation.filter(item => {
		const total:number = calculateItemInstanceTotal(item);
		if(item.holdingItems && item.holdingItems.length){
			const min = item.holdingItems[0].requiredMinCount ?? 0;
			if(total < min){
				return item
			}
		}
	})


	if(!lowItems.length){
		return (
			<Flex direction="column" gap="3">
				<Box className="max-w-xl">
					<Heading mb="3">Low Stock Items</Heading>
					<Text>There are currently no items that have fallen below the required amount in this holding.</Text>
				</Box>
			</Flex>
		)
	}
	return (
		<Flex direction="column" gap="3">
			<Box className="max-w-xl">
				<Heading mb="3">Low Stock Items ({lowItems.length} {lowItems.length === 1 ? 'item' : 'items'})</Heading>
				<Text>Items here show those stock levels that have fallen below the required amount in this holding.</Text>
			</Box>

			{
				lowItems.map(item => <LowItem key={item.id} item={item}/>)
			}
		</Flex>
	)
}

export default HoldingLowStockItemsPage