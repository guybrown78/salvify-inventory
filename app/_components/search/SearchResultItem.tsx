import { Item } from "@prisma/client";
import { Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import StockItemCategoryBadge from "../item/StockItemCategoryBadge";
import StockItemGroupingBadge from "../item/StockItemGroupingBadge";
import StockItemTypeBadge from "../item/StockItemTypeBadge";

interface Props {
	item: Item;
	holdingId: number | null;
	onClearSearch: () => void;
}

const SearchResultItem = ({ item, holdingId, onClearSearch }: Props) => {
	return (
		<Link
			href={
				holdingId
					? `/holdings/${holdingId}/stock/${item.id}`
					: `/stock-items/${item.id}`
			}
			className="bg-white cursor-pointer hover:bg-slate-50"
		>
			<Flex gap="3" justify="between" onClick={onClearSearch}>
				<Text>{item.title}</Text>
				<div className="hidden lg:flex justify-end gap-3">
					<StockItemTypeBadge itemType={item.type} />
					<StockItemCategoryBadge itemCategory={item.category} />
					<StockItemGroupingBadge itemGrouping={item.grouping} />
				</div>
			</Flex>
		</Link>
	);
};

export default SearchResultItem;
