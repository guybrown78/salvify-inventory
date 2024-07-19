import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Flex, Grid, Text } from "@radix-ui/themes";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import ClientHeader from "../_components/client/ClientHeader";
import IssueChart from "../_components/dashboard/IssueChart";
import IssueSummary from "../_components/dashboard/IssueSummary";
import LatestIssues from "../_components/dashboard/LatestIssues";
import Main from "../_components/layout/Main";
import HoldingSummary from "@/app/_components/dashboard/HoldingSummary";

import ExpiringItemsService from '@/app/_utils/ExpiringItemsService';
import LowStockItemsService from "@/app/_utils/LowStockItemsService";
import RemovedItemsService from "@/app/_utils/RemovedItemsService";
import { HoldingSummaryType } from "../_types/types";
import { getSessionUser } from "@/app/_utils/getSessionUser";

export default async function Home() {
	// const session = await getServerSession(authOptions);
	const sessionUser = await getSessionUser();

	const holdings = await prisma.holding?.findMany({ 
		where: {
			clientId: sessionUser!.clientId!,
		}, 
		orderBy: { title: 'asc'}
	});

	const dayOffsetCount = 30;
	let removedItemsCount:number = 0;
	let lowItemsCount:number = 0;
  let expiringItemsCount:number = 0;

	const holdingSummaryItems:HoldingSummaryType[] = await Promise.all(holdings.map(async holding => {
		// 
		const removedItems = await RemovedItemsService.getHoldingRemovedItems(holding.id, dayOffsetCount);
		const lowItems = await LowStockItemsService.getHoldingLowStockItems(holding.id);
		const expiringItems = await ExpiringItemsService.getHoldingExpiringItems(holding.id, dayOffsetCount);
		// 
		removedItemsCount += removedItems.length;
		lowItemsCount += lowItems.length;
		expiringItemsCount += expiringItems.length;
		// 
		return {
				title: holding.title,
				type: holding.type,
				id: holding.id,
				removed: removedItems.length,
				low: lowItems.length,
				expiring: expiringItems.length,
		}
	}));

	return (
		<Main>
			<Flex direction="column" gap="5">
				<ClientHeader 
					holdingsCount={holdings.length}
				/>
				<Grid columns={{ initial: "1", md: "1" }} gap="2" mt="8">
					<Text weight='bold'>Your Dashboard</Text>
					<HoldingSummary
						removed={removedItemsCount}
						low={lowItemsCount}
						expiring={expiringItemsCount}
						holdings={holdingSummaryItems}
					/>
				</Grid>
			</Flex>
		</Main>
	);
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "Salvify Medical Inventory - Dashboard",
	description: "Analysis on all Items, Instances and Holdings",
};
