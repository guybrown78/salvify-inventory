"use client";

import { useState } from "react";

import { ItemWithInstances } from "@/app/_types/types";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Box, Flex, Grid, Text } from "@radix-ui/themes";
import {
	HiChevronDown,
	HiChevronUp,
	HiExclamationTriangle
} from "react-icons/hi2";
import ExpiredItemCard from "./ExpiredItemCard";

interface Props {
	expiredItemsCount: number;
	expiredHoldingItems: ItemWithInstances[];
}

const ExpiredItemCards = ({
	expiredItemsCount,
	expiredHoldingItems,
}: Props) => {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<Collapsible.Root
			className="CollapsibleRoot"
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<Flex
				className="bg-red-50 rounded-xl"
				p="3"
				gap="3"
				align="center"
				justify="between"
				mb="2"
			>
				<Flex gap="3" align="center">
					<HiExclamationTriangle className="text-4xl text-red-600" />
					<Box>
						<Text color="red" size="3" as="p">
							There are currently <strong>{expiredItemsCount}</strong>{" "}
							{expiredItemsCount === 1 ? "item" : "items"} that have expired:
						</Text>
					</Box>
				</Flex>
				<Collapsible.Trigger asChild>
					<button className="flex items-center gap-2">
						{isOpen ? "Hide" : "Show"}
						{isOpen ? <HiChevronUp /> : <HiChevronDown />}
					</button>
				</Collapsible.Trigger>
			</Flex>

			<Collapsible.Content>
				<Grid columns={{ initial: "1", md: "2", lg: "3", xl: "4" }} gap="4">
					{expiredHoldingItems.map((expiredItem, index) => (
						<ExpiredItemCard key={`expired-${expiredItem.id}-${index}`} item={expiredItem} />
					))}
				</Grid>
			</Collapsible.Content>
		</Collapsible.Root>
	);
};

export default ExpiredItemCards;
