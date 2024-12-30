import HoldingSummary from "@/app/_components/dashboard/HoldingSummary";
import prisma from "@/prisma/client";
import { Flex, Grid, Text } from "@radix-ui/themes";
import { Metadata } from "next";
import ClientHeader from "../_components/client/ClientHeader";
import Main from "../_components/layout/Main";

import ExpiringItemsService from "@/app/_utils/ExpiringItemsService";
import LowStockItemsService from "@/app/_utils/LowStockItemsService";
import RemovedItemsService from "@/app/_utils/RemovedItemsService";

import { getServerSession } from "next-auth";
import { NoDataMessage } from "../_components";
import ExpiredItems from "../_components/dashboard/expired/ExpiredItems";
import { HoldingSummaryType } from "../_types/types";
import authOptions from "../auth/authOptions";

export default async function Home() {
	
	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		// Handle the case where session.user is not available
		return (
			<Main>
				<Flex direction="column" gap="3">
					<NoDataMessage>Session user data is not available</NoDataMessage>
				</Flex>
			</Main>
		);
	}

	const holdings = await prisma.holding?.findMany({
		where: {
			clientId: session.user.clientId!,
		},
		orderBy: { title: "asc" },
	});

	const dayOffsetCount = 30;
	let removedItemsCount: number = 0;
	let lowItemsCount: number = 0;
	let expiringItemsCount: number = 0;

	const holdingSummaryItems: HoldingSummaryType[] = await Promise.all(
		holdings.map(async (holding) => {
			//
			const removedItems = await RemovedItemsService.getHoldingRemovedItems(
				holding.id,
				dayOffsetCount
			);
			const lowItems = await LowStockItemsService.getHoldingLowStockItems(
				holding.id
			);
			const expiringItems = await ExpiringItemsService.getHoldingExpiringItems(
				holding.id,
				dayOffsetCount
			);
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
			};
		})
	);

	return (
		<Main>
			<Flex direction="column" gap="5">
				<ClientHeader holdingsCount={holdings.length} />
				<Grid columns={{ initial: "1", md: "1" }} gap="2" mt="8">
					<Text weight="bold">Your Dashboard</Text>
					<ExpiredItems clientId={session.user.clientId!} holdings={holdings} />
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
