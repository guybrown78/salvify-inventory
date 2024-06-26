import React from 'react'
import prisma from '@/prisma/client';
import { fetchHolding } from '../../holdingQuery'
import { notFound } from 'next/navigation'
import { cache } from 'react';
import StockItemHeader from '@/app/_components/item/StockItemHeader';
import { Flex, Heading } from '@radix-ui/themes';
import StockOverview from './StockOverview';
import StockInstanceTable from './StockInstanceTable';
import { StockHoldingItemOverview } from './StockHoldingItemOverview';

interface Props{
	params: { 
		holdingId: string 
		itemId: string 
	}
}

const fetchItem = cache((itemId: number, holdingId: number, clientId: number) => prisma.item.findUnique({
	where: { id: itemId },
	include: {
    instances: {
      where: {
				AND: [
					{ clientId: clientId },
          { location: { holdingId: holdingId } },
          { quantity: { gt: 0 } }
        ]
      },
			include: {
				location: true,
			},
    },
		holdingItems: {
      where: { holding: { id: holdingId } }, 
    },
  },
}));

const StockItemPage = async ({ params }: Props) => {
	const holding = await fetchHolding(parseInt(params.holdingId))

	if(!holding)
		notFound();

	const item = await fetchItem(parseInt(params.itemId), holding.id, holding.clientId);
	
	if(!item)
		notFound();

	return (
		<Flex direction="column" gap="5">
			<StockItemHeader item={item} showEdit={false} />
			<Flex direction="column" gap="5" mt="8"> 
				<StockOverview item={item} holdingId={holding.id}/>
				<StockHoldingItemOverview item={item} holdingId={holding.id}/>
				<Flex direction="column" gap="5">
					<Heading as="h3" size="3" >Instances ({item.instances.length || 0})</Heading>
					<StockInstanceTable item={item} />
				</Flex>
			</Flex>
			
			
		</Flex>
		
	)
}


export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }:Props){

	const holding = await fetchHolding(parseInt(params.holdingId))
	const item = await fetchItem(parseInt(params.itemId), holding!.id, holding!.clientId);

	return {
		title: item?.title,
		description: 'Details of stock item ' + item?.id + ' within the holding of ' + holding?.title
	}	
}


export default StockItemPage