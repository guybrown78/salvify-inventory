import { NoDataMessage } from "@/app/_components";
import InstanceExpiryDate from "@/app/_components/InstanceExpiryDate";
import StockItemOverviewContainers, {
	OverviewContainerType,
} from "@/app/_components/item/StockItemOverviewContainers";
import { ItemWithInstancesHoldingItems } from "@/app/_types/types";
import { Flex, Heading } from "@radix-ui/themes";

interface Props {
	item: ItemWithInstancesHoldingItems;
}

const ItemOverview = ({ item }: Props) => {
	// Calculate Total Stock
	const totalStock = item.instances
		? item.instances.reduce(
				(total, instance) => total + (instance.quantity || 0),
				0
		  )
		: 0;

	// Calculate Required Stock
	const requiredStock = item.holdingItems
		? item.holdingItems.reduce(
				(total, holdingItem) => total + (holdingItem.requiredMinCount || 0),
				0
		  )
		: 0;

	// Calculate All Holdings Count
	const holdingsCount = item.instances
		? Array.from(new Set(item.instances.map((instance) => instance.locationId)))
				.length
		: 0;

	// Calculate Nearest Expiry Date
	const nearestExpiryDate =
		item.instances && item.instances.length > 0
			? item.instances.reduce((nearest, instance) => {
					if (!instance.expiryDate) return nearest;
					if (!nearest || instance.expiryDate < nearest) {
						return instance.expiryDate;
					}
					return nearest;
			  }, null as Date | null)
			: null;

	// Calculate Furthest Expiry Date
	const furthestExpiryDate =
		item.instances && item.instances.length > 0
			? item.instances.reduce((furthest, instance) => {
					if (!instance.expiryDate) return furthest;
					if (!furthest || instance.expiryDate > furthest) {
						return instance.expiryDate;
					}
					return furthest;
			  }, null as Date | null)
			: null;

	const containers: OverviewContainerType[] = [
		{
			label: "Total Stock",
			value: totalStock.toString(),
			color: totalStock < requiredStock ? "red" : "green",
		},
		{ label: "Required Stock", value: requiredStock.toString(), color: "gray" },
		{
			label: "All Holdings Count",
			value: holdingsCount.toString(),
			color: "gray",
		},
		{
			label: "Nearest expiry date",
			value: nearestExpiryDate ? (
				<InstanceExpiryDate
					expiryDate={String(nearestExpiryDate)}
					showCountdown={true}
					asBadge
				/>
			) : (
				"N/A"
			),
			className: "col-span-12 sm:col-span-6 xl:col-span-3",
		},
		{
			label: "Furthest expiry date",
			value: furthestExpiryDate ? (
				<InstanceExpiryDate
					expiryDate={String(furthestExpiryDate)}
					showCountdown={true}
					asBadge
				/>
			) : (
				"N/A"
			),
			className: "col-span-12 sm:col-span-6 xl:col-span-3",
		},
	];

	if (!item.instances || !item.instances.length) {
		return (
			<Flex direction="column" gap="5">
				<Heading as="h3" size="3">
					Overview
				</Heading>

				<NoDataMessage withBackground>
					There are currently no instances for this Item.
				</NoDataMessage>
			</Flex>
		);
	}

	return (
		<Flex direction="column" gap="5">
			<Heading as="h3" size="3">
				Overview
			</Heading>

			<StockItemOverviewContainers containers={containers} />
			
		</Flex>
	);
};

export default ItemOverview;
