
import prisma from '@/prisma/client'
import StockItemUsage from './StockItemUsage';
import { ItemWithInstancesHoldingItems } from '@/app/_types/types';

interface Props {
	clientId: number
	holdingId: number
}

const FindHoldingStockItem = async ({ clientId, holdingId }:Props) => {

	// get items in the client

	const itemsInHolding = await prisma.item.findMany({
		where: {
			clientId: clientId,
			OR: [
				{
					instances: {
						some: {
							location: {
								holdingId: holdingId,
							},
						},
					},
				},
				{
					holdingItems: {
						some: {
							holdingId: holdingId,
						},
					},
				},
			],
		},
		include: {
			instances: {
				where: {
					location: {
						holdingId: holdingId,
					},
				},
				include: {
					location: true,
				},
			},
			holdingItems: {
				where: {
					holdingId: holdingId,
				},
			},
		},
	});


	if(!itemsInHolding){
		return null;
	}

	return (
		<StockItemUsage
			items={itemsInHolding as ItemWithInstancesHoldingItems[]} 
		/>
	)
}
export const dynamic = 'force-dynamic';
export default FindHoldingStockItem
