import { notFound } from 'next/navigation';
import HoldingHeader from '../HoldingHeader';
import { HoldingPageProps, fetchHolding } from '../holdingQuery';

import { Flex } from '@radix-ui/themes';
import StockLocationTabs from './StockLocationTabs';
import StockTable from './StockTable'
import { Issue, Location } from '@prisma/client';
import prisma from '@/prisma/client';


export interface StockQuery {
	location: string;
	orderBy: keyof Issue;
	page: string;
}


interface Props extends HoldingPageProps{
	searchParams: StockQuery
}

const HoldingStockPage = async ({ params, searchParams }: Props) => {
	const holding = await fetchHolding(parseInt(params.holdingId))

	if(!holding)
		notFound();
	
	const locationId = searchParams.location 
		? parseInt(searchParams.location) 
		: undefined;
	// const where = { location };
	

	const itemsInHoldingAndLocation = await prisma.item.findMany({
		where: {
			instances: {
				some: {
					location: {
						holding: {
							id: holding.id,
						},
						id: locationId,
					},
				},
			},
		},
		include: {
			instances: {
				where: {
					location: {
						holding: {
							id: holding.id,
						},
						id: locationId, 
					},
				},
			},
		},
	});


	return (
		<Flex direction="column" gap="3">
			<StockLocationTabs 
				locations={holding.locations as Location[] || []}
			/>
			<StockTable 
				items={itemsInHoldingAndLocation}
				holdingId={holding.id}
			/>
		</Flex>
	)
}

export default HoldingStockPage