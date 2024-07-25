import { Holding, Item } from "@prisma/client";
import { Box, Button, Flex, Heading, Strong, Text } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import NoDataMessage from "../NoDataMessage";
import SearchResultItem from "./SearchResultItem";

interface Props {
	searchString: string | null;
	holding: Holding | null;
	onClearSearch: () => void;
}

const SearchResults = ({ searchString, holding, onClearSearch }: Props) => {
	const [items, setItems] = useState<Item[] | null>(null);
	useEffect(() => {
		fetchItems();
	}, [searchString]);

	const fetchItems = async () => {
		if (searchString) {
			try {
				const endpoint = holding
					? `/api/holdings/${holding.id}/items`
					: "/api/items";
				const results = await axios.get(`${endpoint}?search=${searchString}`);
				if (results.data) {
					setItems(results.data);
				}
			} catch (error) {
				console.error("Error fetching items:", error);
				setItems(null);
			}
		} else {
			setItems(null);
		}
	};

	if (!searchString) {
		return <></>;
	}

	if (!items) {
		return <NoDataMessage>There are no items</NoDataMessage>;
	}

	return (
		<div className="flex flex-col flex-1 pr-2">
			<Box className="py-4">
				<Text size="2">
					Search results <Strong>{holding ? `in ${holding.title}` : ""}</Strong>{" "}
					for;
				</Text>
				<Flex gap="2" align="end">
					<Heading size="4">&quot;{searchString}&quot;</Heading>
					<Text size="2">
						({items.length}) {`item${items.length !== 1 ? "s" : ""} found`}
					</Text>
				</Flex>
			</Box>

			<div className="flex-1 ">
				<Flex direction="column" gap="2">
					{items.map((item) => (
						<SearchResultItem
							key={item.id}
							item={item}
							holdingId={holding ? holding.id : null}
							onClearSearch={onClearSearch}
						/>
					))}
				</Flex>
				{!items.length && (
					<NoDataMessage>There are no items found this search</NoDataMessage>
				)}
			</div>
			<div className="py-4">
				<Flex gap="2" align="end" justify="end" mt="2">
					<Button type="button" onClick={onClearSearch}>
						Clear search
					</Button>
				</Flex>
			</div>
		</div>
	);
};

export default SearchResults;
