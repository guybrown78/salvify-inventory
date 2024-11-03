import InstanceExpiryDate from "@/app/_components/InstanceExpiryDate";
import StockItemOverviewContainers, {
	OverviewContainerType,
} from "@/app/_components/item/StockItemOverviewContainers";
import {
	ItemWithInstancesHoldingItems
} from "@/app/_types/types";
import prisma from "@/prisma/client";
import { Flex, Heading } from "@radix-ui/themes";

interface Props {
	item: ItemWithInstancesHoldingItems;
	holdingId: number;
}
const StockOverview = async ({ item, holdingId }: Props) => {
	const where = {
		itemId: item.id,
		quantity: {
			gt: 0,
		},
		location: {
			holdingId: holdingId,
		},
	};

	const earliestExpiryDateInstance = await prisma.instance.findFirst({
		where,
		orderBy: {
			expiryDate: "asc",
		},
	});

	const earliestExpiryDate = earliestExpiryDateInstance
		? earliestExpiryDateInstance.expiryDate
		: null;

	const latestExpiryDateInstance = await prisma.instance.findFirst({
		where,
		orderBy: {
			expiryDate: "desc",
		},
	});

	const latestExpiryDate = latestExpiryDateInstance
		? latestExpiryDateInstance.expiryDate
		: null;

	const instanceLocations = await prisma.instance.findMany({
		where,
		distinct: ["locationId"],
	});

	const locationsCount = instanceLocations.length;

	const totalQuantity = item.instances
		? item.instances.reduce((total, instance) => total + instance.quantity, 0)
		: "";

	const requiredCount = () => {
		if (item.holdingItems && item.holdingItems.length) {
			return item.holdingItems[0].requiredMinCount ?? 0;
		}
		return "-";
	};
	const containers: OverviewContainerType[] = [
		{ label: "Required Stock", value: requiredCount(), color: "gray" },
		{ label: "Total Stock", value: String(totalQuantity), color: "gray" },
		{ label: "Location Count", value: String(locationsCount), color: "gray" },
		{
			label: "Nearest expiry date",
			value: earliestExpiryDate ? (
				<InstanceExpiryDate
					expiryDate={earliestExpiryDate}
					showCountdown
					asBadge
				/>
			) : (
				"N/A"
			),
			className: "col-span-12 sm:col-span-6 xl:col-span-3",
		},
		{
			label: "Furthest expiry date",
			value: latestExpiryDate ? (
				<InstanceExpiryDate
					expiryDate={latestExpiryDate}
					showCountdown
					asBadge
				/>
			) : (
				"N/A"
			),
			className: "col-span-12 sm:col-span-6 xl:col-span-3",
		},
	];

	return (
		<Flex direction="column" gap="5">
			<Heading as="h3" size="3">
				Overview
			</Heading>
			<StockItemOverviewContainers containers={containers} />
		</Flex>
	);
};

export default StockOverview;
