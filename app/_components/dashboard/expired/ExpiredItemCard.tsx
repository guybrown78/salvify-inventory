import { InstanceWithLocation } from "@/app/(main)/holdings/[holdingId]/add/InstanceItems";
import { ItemWithInstancesHoldingItems } from "@/app/_types/types";
import { Item } from "@prisma/client";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { HiExclamationTriangle } from "react-icons/hi2";
import StockItemTypeBadge from "../../item/StockItemTypeBadge";
import ExpiredItemInstance from "./ExpiredItemInstance";
import ExpiredItemInstances from "./ExpiredItemInstances";
interface Props {
	item: ItemWithInstancesHoldingItems;
}

const ExpiredItemCard = ({ item }: Props) => {

	if (!item.instances || item.instances.length === 0) {
    return null;
  }


	return (
		<Card key={item.id}>
			<Flex direction="column" gap="2" justify="between" height="100%">
				<Flex direction="column" gap="2">
					<Flex gap="3" align="center">
						<HiExclamationTriangle className="text-xl text-red-600" />
						<Box>
							<Text size="3" as="p">
								{item.title}
							</Text>
						</Box>
						<StockItemTypeBadge itemType={item.type} />
					</Flex>
				</Flex>
				{item.instances?.length > 1 && (
					<ExpiredItemInstances item={item} />
				)}

				{item.instances?.length === 1 && (
					<ExpiredItemInstance
						instance={item.instances?.[0] as InstanceWithLocation}
						item={item as Item}
					/>
				)}
			</Flex>
		</Card>
	);
};

export default ExpiredItemCard;
