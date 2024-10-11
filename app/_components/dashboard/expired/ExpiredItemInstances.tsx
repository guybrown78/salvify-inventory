"use client";

import { InstanceWithLocation } from "@/app/(main)/holdings/[holdingId]/add/InstanceItems";
import { ItemWithInstancesHoldingItems } from "@/app/_types/types";
import { Item } from "@prisma/client";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Flex, Tabs, Text } from "@radix-ui/themes";
import { useState } from "react";
import ExpiredItemInstance from "./ExpiredItemInstance";
import './styles.css';

interface Props {
	item: ItemWithInstancesHoldingItems;
}

const ExpiredItemInstances = ({ item }: Props) => {
	const [instance, setInstance] = useState<InstanceWithLocation>(
		item.instances?.[0] as InstanceWithLocation
	);
	return (
		<Flex direction="column" gap="1">
			<Text size="1">{`There are ${item.instances?.length} Instances for this Item:`}</Text>
			<ScrollArea.Root className="ScrollAreaRoot">
				<ScrollArea.Viewport className="ScrollAreaViewport">
					<Flex justify="between">
						<Tabs.Root
							className="w-full"
							defaultValue="0"
							onValueChange={(index) => {
								setInstance(item.instances?.[parseInt(index)] as InstanceWithLocation);
							}}
						>
							<Tabs.List>
								{item.instances?.map((instance, index) => (
									<Tabs.Trigger key={instance.id} value={String(index)}>
										<Text size="1">Instance {index + 1}</Text>
									</Tabs.Trigger>
								))}
							</Tabs.List>
						</Tabs.Root>
					</Flex>
				</ScrollArea.Viewport>
				<ScrollArea.Scrollbar
					className="ScrollAreaScrollbar"
					orientation="horizontal"
				>
					<ScrollArea.Thumb className="ScrollAreaThumb" />
				</ScrollArea.Scrollbar>
				<ScrollArea.Corner className="ScrollAreaCorner" />
			</ScrollArea.Root>

			<ExpiredItemInstance instance={instance} item={item as Item} />
		</Flex>
	);
};

export default ExpiredItemInstances;
