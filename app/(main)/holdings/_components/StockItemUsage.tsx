'use client'

import { ItemWithInstancesHoldingItems } from "@/app/_types/types";
import { Flex, Select } from "@radix-ui/themes";
import { useState } from "react";
import StockInstanceTable from "../[holdingId]/stock/[itemId]/StockInstanceTable";

interface Props {
	items: ItemWithInstancesHoldingItems[]
}

const ItemSelectInput = ({ items }: Props) => {

	const [item, setItem] = useState<ItemWithInstancesHoldingItems | null>(null)
	const selectItem = (itemId: string) => {
		const selectedItem = items.filter(item => item.id === parseInt(itemId))[0]
		console.log(selectedItem)
		setItem(selectedItem)
	};

	return (
		<Flex gap="5" direction="column">
			<Select.Root onValueChange={selectItem}>
				<Select.Trigger />
				<Select.Content>
					<Select.Group>
						<Select.Label>Holding Stock Item</Select.Label>
						{/* <Select.Item value="">Unassign</Select.Item> */}
						{items?.map((item) => (
							<Select.Item key={item.id} value={String(item.id)}>
								{item.title}
							</Select.Item>
						))}
					</Select.Group>
				</Select.Content>
			</Select.Root>

			{item && (
				<Flex gap="3" direction="column">
					<StockInstanceTable item={item} />
				</Flex>
			)}

		</Flex>

	);
};

export const dynamic = 'force-dynamic';
export default ItemSelectInput;
