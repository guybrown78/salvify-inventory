import { InstanceWithLocation } from "@/app/(main)/holdings/[holdingId]/add/InstanceItems";
import { ItemWithInstances, LocationWithHolding } from "@/app/_types/types";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { HiExclamationTriangle } from "react-icons/hi2";
import InstanceExpiryDate from "../../InstanceExpiryDate";
import StockItemTypeBadge from "../../item/StockItemTypeBadge";
import RemoveInstanceDialog from "../../remove/RemoveInstanceDialog";
import { ItemWithInstancesHoldingItems } from "@/app/_types/types";
import { Holding, Item, RemoveInstanceReason } from "@prisma/client";
interface Props {
	instance:  InstanceWithLocation;
	item: Item;
}

const ExpiredItemInstance = ({ instance, item }: Props) => {


	const location: LocationWithHolding = instance.location as LocationWithHolding

	return (

			<Flex direction="column" gap="2" justify="between" height="100%" grow="1">
				<Flex direction="column" gap="2">
					<Flex gap="1" direction="column">
						<Text size="1" as="p">
							Expired on:
						</Text>
						<InstanceExpiryDate
							expiryDate={instance.expiryDate ? String(instance.expiryDate) : null }
							showCountdown
							asBadge
						/>
					</Flex>

					<Text size="2">
						Holding: <strong>{location.holding.title}</strong>
					</Text>
					<Text size="2">
						Quantity: <strong>{instance.quantity}</strong>
					</Text>
				</Flex>
				<RemoveInstanceDialog
					instance={instance}
					item={item}
					holdingId={location.holding.id}
					defaultReason={RemoveInstanceReason.EXPIRED}
					defaultQuantity={instance.quantity}
				/>
			</Flex>
			
	
	
	)
}

export default ExpiredItemInstance