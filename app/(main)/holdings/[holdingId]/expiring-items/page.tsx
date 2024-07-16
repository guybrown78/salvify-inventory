import { notFound } from "next/navigation";
import { HoldingPageProps, fetchHolding } from "../holdingQuery";

import { Flex } from "@radix-ui/themes";

import ExpiringItemsService from "@/app/_utils/ExpiringItemsService";
import ExpiringItem from "./ExpiringItem";
import ExpiringItemsToolbar, {
	ExpiringItemsQuery,
} from "./ExpiringItemsToolbar";

interface Props extends HoldingPageProps {
	searchParams: ExpiringItemsQuery;
}

const HoldingExpiringItemsPage = async ({ params, searchParams }: Props) => {
	const holding = await fetchHolding(parseInt(params.holdingId));

	if (!holding) notFound();

	const dayOffsetCount = searchParams.offset
		? parseInt(searchParams.offset)
		: 30;
	const expiringItems = await ExpiringItemsService.getHoldingExpiringItems(
		holding.id,
		dayOffsetCount
	);

	return (
		<Flex direction="column" gap="3">
			<ExpiringItemsToolbar
				expiringItemsCount={expiringItems.length ?? 0}
				dayOffsetCount={dayOffsetCount}
			/>
			{expiringItems.map((item) => (
				<ExpiringItem key={item.id} item={item} />
			))}
		</Flex>
	);
};

export default HoldingExpiringItemsPage;
