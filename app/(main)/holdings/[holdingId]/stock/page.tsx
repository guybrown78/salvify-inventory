import { notFound } from "next/navigation";
import { HoldingPageProps, fetchHolding } from "../holdingQuery";

import { ItemWithInstancesHoldingItems } from "@/app/_types/types";
import prisma from "@/prisma/client";
import { Issue, Location } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import StockLocationTabs from "./StockLocationTabs";
import StockTable from "./StockTable";
import { Pagination } from "@/app/_components";

export interface StockQuery {
	location: string;
	orderBy: keyof Issue;
	page: string;
}

interface Props extends HoldingPageProps {
	searchParams: StockQuery;
}

const HoldingStockPage = async ({ params, searchParams }: Props) => {
	const holding = await fetchHolding(parseInt(params.holdingId));

	if (!holding) notFound();

	const locationId = searchParams.location
		? parseInt(searchParams.location)
		: undefined;

	// const itemsInHoldingAndLocation = await prisma.item.findMany({
	// 	where: {
	// 		instances: {
	// 			some: {
	// 				location: {
	// 					holding: {
	// 						id: holding.id,
	// 					},
	// 					id: locationId,
	// 				},
	// 			},
	// 		},
	// 	},
	// 	include: {
	// 		instances: {
	// 			where: {
	// 				location: {
	// 					holding: {
	// 						id: holding.id,
	// 					},
	// 					id: locationId,
	// 				},
	// 			},
	// 		},
	// 	},
	// });

	const holdingItemQuery: any = {
		holding: {
			id: holding.id,
		},
	};

	const whereClause: any = {
		OR: [
			{
				instances: {
					some: {
						location: {
							holding: {
								id: holding.id,
							},
							id: locationId,
						},
					},
				},
			},
		],
	};

	if (locationId === undefined) {
		whereClause.OR.push({
			holdingItems: {
				some: holdingItemQuery,
			},
		});
	}

	const page = parseInt(searchParams.page) || 1;
	const pageSize = 20;

	const itemsInHoldingAndLocation = await prisma.item.findMany({
		where: whereClause,
		include: {
			instances: {
				where: {
					location: {
						holding: {
							id: holding.id,
						},
						id: locationId,
					},
				},
			},
			holdingItems: {
				where: {
					holding: {
						id: holding.id,
					},
				},
			},
		},
		skip: (page - 1) * pageSize,
		take: pageSize
	});

	const itemsCount = await prisma.item?.count({ where: whereClause })

	return (
		<Flex direction="column" gap="3">
			<StockLocationTabs locations={(holding.locations as Location[]) || []} />
			<StockTable
				items={itemsInHoldingAndLocation as ItemWithInstancesHoldingItems[]}
				holdingId={holding.id}
			/>
			<Pagination 
				itemCount={itemsCount}
				pageSize={pageSize}
				currentPage={page}
			/>
		</Flex>
	);
};

export default HoldingStockPage;
