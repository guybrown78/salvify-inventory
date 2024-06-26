import { notFound } from 'next/navigation';
import HoldingHeader from '../HoldingHeader';
import { HoldingPageProps, fetchHolding } from '../holdingQuery';


import { ItemWithInstancesHoldingItems } from '@/app/_types/types';
import { Box, Flex, Heading, Text } from '@radix-ui/themes';

import prisma from "@/prisma/client";
import ExpiringItemsToolbar, { ExpiringItemsQuery } from './ExpiringItemsToolbar';
import ExpiringItem from './ExpiringItem';




interface Props extends HoldingPageProps {
	searchParams: ExpiringItemsQuery
}



const HoldingExpiringItemsPage = async ({ params, searchParams }: Props) => {
	const holding = await fetchHolding(parseInt(params.holdingId))

	if(!holding)
		notFound();
	
	const now = new Date();
  const dayOffset = new Date();
	const dayOffsetCount = searchParams.offset ? parseInt(searchParams.offset) : 30;
  dayOffset.setDate(now.getDate() + dayOffsetCount);

	const expiringItems:ItemWithInstancesHoldingItems[] = await prisma.item.findMany({
    where: {
      instances: {
        some: {
          expiryDate: {
            gte: now,
            lte: dayOffset,
          },
          location: {
            holdingId: holding.id,
          },
        },
			
      },
    },
	
    include: {
      instances: {
        where: {
          expiryDate: {
            gte: now,
            lte: dayOffset,
          },
          location: {
            holdingId: holding.id,
          },
        },
				include: {
					location: true,
				},
      },
    },
  });

	return (
		<Flex direction="column" gap="3">

			<ExpiringItemsToolbar 
				expiringItemsCount={expiringItems.length ?? 0}
				dayOffsetCount={dayOffsetCount}
			/>
			{
				expiringItems.map(item => <ExpiringItem key={item.id} item={item}/>)
			}
	</Flex>
	)
}

export default HoldingExpiringItemsPage