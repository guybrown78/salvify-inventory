import HoldingSummary from "@/app/_components/dashboard/HoldingSummary";
import prisma from "@/prisma/client";
import { Flex, Grid, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import HoldingHeader from "../HoldingHeader";
import { HoldingPageProps, fetchHolding } from "../holdingQuery";
import ExpiringItemsService from '@/app/_utils/ExpiringItemsService';
import LowStockItemsService from "@/app/_utils/LowStockItemsService";
import RemovedItemsService from "@/app/_utils/RemovedItemsService";

const HoldingDashboardPage = async ({ params }: HoldingPageProps) => {
	const holding = await fetchHolding(parseInt(params.holdingId));

	if (!holding) notFound();


	const dayOffsetCount = 30;
	const removedItems = await RemovedItemsService.getHoldingRemovedItems(holding.id, dayOffsetCount);
	const lowItems = await LowStockItemsService.getHoldingLowStockItems(holding.id);
  const expiringItems = await ExpiringItemsService.getHoldingExpiringItems(holding.id, dayOffsetCount);


	return (
		<Flex direction="column" gap="5">
			<HoldingHeader holding={holding} />
			
			<Grid columns={{ initial: "1", md: "1" }} gap="2" mt="8">
				<Text weight='bold'>Your Dashboard</Text>
				<HoldingSummary
					removed={removedItems.length}
					low={lowItems.length}
					expiring={expiringItems.length}
					holdingId={holding.id}
				/>
			</Grid>
		</Flex>
	);
};

export default HoldingDashboardPage;
