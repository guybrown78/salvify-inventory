import ExpiringItemsService from "@/app/_utils/ExpiringItemsService";
import { Holding } from "@prisma/client";
import { Flex, Text } from "@radix-ui/themes";

import ExpiredItemCards from "./ExpiredItemCards";

interface Props {
	clientId: number | null;
	holdings: Holding[];
}

const ExpiredItems = async ({ clientId, holdings }: Props) => {
	let expiredItemsCount: number = 0;
	let expiredHoldingItems: any[] = [];

	const expiredItems = await Promise.all(
		holdings.map(async (holding) => {
			//
			const expiredItems = await ExpiringItemsService.getHoldingExpiredItems(
				holding.id
			);
			expiredItemsCount += expiredItems.length;
			expiredHoldingItems.push(...expiredItems);
		})
	);

	// If no expired items are found, return null
	if (expiredHoldingItems.length === 0) {
		return null;
	}

	// console.log(" ")
	// console.log(" --- ")
	// console.log(expiredHoldingItems)
	return (
		<div className="mt-2">
			<ExpiredItemCards
				expiredItemsCount={expiredItemsCount}
				expiredHoldingItems={expiredHoldingItems}
			/>
		</div>
	);
};

export default ExpiredItems;
