import { notFound } from 'next/navigation';
import { HoldingPageProps, fetchHolding } from '../holdingQuery';
import { Heading, Text, Box, Flex } from '@radix-ui/themes';
import InstanceItems from '../add/InstanceItems';
import prisma from '@/prisma/client'
import FindHoldingStockItem from '../../_components/FindHoldingStockItem';
import RemovedItems from '../../_components/RemovedItems';


const HoldingRemovedItemPage = async ({ params }: HoldingPageProps) => {
	const holding = await fetchHolding(parseInt(params.holdingId))

	if(!holding)
		notFound();
	
	return (
		<Flex direction="column" gap="3">
			<Box className="max-w-xl">
				<Heading mb="3">Deduct item instances</Heading>
				<Text>Here you can select items that are in the stock list for this holding. Once you find an item you can deduct them from the inventory.</Text>
			</Box>

			<FindHoldingStockItem 
				clientId={holding.clientId} 
				holdingId={holding.id}
			/>

			
			<RemovedItems 
				clientId={holding.clientId} 
				holdingId={holding.id}
			/>

		</Flex>
	)
}

export const dynamic = 'force-dynamic';
export default HoldingRemovedItemPage