import { Item } from "@prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button, Flex, Grid, Heading } from "@radix-ui/themes";
import Link from "next/link";
import LabelValueColumn from "../LabelValueColumn";
import PageHeaderBannerWrapper from "../PageHeaderBannerWrapper";
import StockItemAddToOrderButton from "./StockItemAddToOrderButton";
import StockItemCategoryBadge from "./StockItemCategoryBadge";
import StockItemGroupingBadge from "./StockItemGroupingBadge";
import StockItemInformationButton from "./StockItemInformationButton";
import StockItemLinks from "./StockItemLinks";
import StockItemTypeBadge from "./StockItemTypeBadge";

interface Props {
	item: Item;
	showEdit: boolean;
}

const StockItemHeader = ({ item, showEdit }: Props) => {
	return (
		<PageHeaderBannerWrapper>
			<Grid
				columns={{ initial: "1", md: "2" }}
				gap={{ initial: "2", md: "5" }}
				py="6"
			>
				<Flex direction="column">
					<Heading as="h1" size="5" weight="bold">
						{item.title}
					</Heading>
					<Flex py="2" gap="3">
						<LabelValueColumn label="Type:">
							<StockItemTypeBadge itemType={item.type} />
						</LabelValueColumn>
						<LabelValueColumn label="Category:">
							<StockItemCategoryBadge itemCategory={item.category} />
						</LabelValueColumn>
						<LabelValueColumn label="Group:">
							<StockItemGroupingBadge itemGrouping={item.grouping} />
						</LabelValueColumn>
					</Flex>
				</Flex>

				<Flex
					direction={{ initial: "column-reverse", md: "column" }}
					justify="between"
					align={{ initial: "start", md: "end" }}
				>
					<Flex gap="3" align="center" justify="end">
						<StockItemAddToOrderButton title={item.title} itemId={item.id} />
						<StockItemInformationButton
							information={item.information}
							title={item.title}
						/>
						{showEdit && (
							<Link href={`/stock-items/edit/${item.id}`}>
								<Button variant="solid">
									<Pencil2Icon /> Edit
								</Button>
							</Link>
						)}
					</Flex>

					<StockItemLinks item={item} />
				</Flex>
			</Grid>
		</PageHeaderBannerWrapper>
	);
};

export default StockItemHeader;
