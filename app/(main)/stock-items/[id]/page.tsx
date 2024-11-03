import authOptions from '@/app/auth/authOptions';
import { NoDataMessage } from '@/app/_components'
import { Box, Flex } from '@radix-ui/themes'
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import StockItemHeader from '@/app/_components/item/StockItemHeader';
import { getSessionUser } from '@/app/_utils/getSessionUser'
import ItemOverview from './ItemOverview';
import ItemHoldings from './ItemHoldings';
import { ItemWithInstancesHoldingItems } from '@/app/_types/types';

interface Props {
	params: { id: string }
}

const fetchItem = cache((itemId: number, clientId: number) => prisma.item.findUnique({
	where: { 
		id: itemId,
		clientId: clientId 
	},
	include: {
		holdingItems: {
			where: {
				clientId: clientId,
			},
		},
		instances: {
      include: {
        location: true,
      },
    },
	},
}));


const StockItemPage = async ({ params }: Props) => {

	// const session = await getServerSession(authOptions)
	const sessionUser = await getSessionUser();
	// Check if sessionUser is null or undefined
  if (!sessionUser) {
    // Handle the case where sessionUser is not available
    return (
      <Flex direction="column" gap="3">
        <NoDataMessage>
          Session user data is not available
        </NoDataMessage>
      </Flex>
    );
  }

	const item:ItemWithInstancesHoldingItems | null = await fetchItem(parseInt(params.id), sessionUser!.clientId!) as ItemWithInstancesHoldingItems | null;

	if(!item)
		notFound();

	return (
		<Flex direction="column" gap="5">
			<StockItemHeader item={item} showEdit />
			<Flex mt="8" gap="5" direction="column">
				<ItemOverview item={item} />
				<ItemHoldings item={item} />
			</Flex>
		</Flex>
		
	)
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }:Props){
	const sessionUser = await getSessionUser();
	const item:ItemWithInstancesHoldingItems | null = await fetchItem(parseInt(params.id), sessionUser!.clientId!);

	return {
		title: item?.title || "",
		description: 'Details of stock item ' + item?.id || "-"
	}
}


export default StockItemPage