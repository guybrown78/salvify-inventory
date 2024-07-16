import { notFound } from 'next/navigation';
import { HoldingPageProps, fetchHolding } from '../holdingQuery';
import { Heading, Text, Box, Flex } from '@radix-ui/themes';
import InstanceItems from '../add/InstanceItems';
import prisma from '@/prisma/client'
import FindHoldingStockItem from '../../_components/FindHoldingStockItem';
import RemovedItems from '../../_components/RemovedItems';


export interface RemovedItemsQuery {
	offset: string;
	page: string;
}


interface Props extends HoldingPageProps {
	searchParams: RemovedItemsQuery;
}



const HoldingStockItemUsagePage = async ({ params, searchParams }:Props) => {
	const holding = await fetchHolding(parseInt(params.holdingId))

	const dayOffsetCount = searchParams.offset
		? parseInt(searchParams.offset)
		: 30;

	if(!holding)
		notFound();
	
	// // get items in the client
	// const items = await prisma.item.findMany({
	// 	where: { clientId: holding.clientId }, 
	// });


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
				offset={dayOffsetCount}
			/>

		</Flex>
	)
}

export const dynamic = 'force-dynamic';
export default HoldingStockItemUsagePage