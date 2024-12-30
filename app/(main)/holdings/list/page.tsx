import { NoDataMessage, Pagination } from "@/app/_components";
import Main from "@/app/_components/layout/Main";
import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { holdingTypeValues } from "@/prisma/enums";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import HoldingsTable, { HoldingQuery } from "./HoldingsTable";
import HoldingsToolbar from "./HoldingsToolbar";

interface Props {
	searchParams: HoldingQuery;
}

const HoldingListPage = async ({ searchParams }: Props) => {
	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		// Handle the case where session.user is not available
		return (
			<Main>
				<Flex direction="column" gap="3">
					<NoDataMessage>Session user data is not available</NoDataMessage>
				</Flex>
			</Main>
		);
	}

	const type = holdingTypeValues.includes(searchParams.type)
		? searchParams.type
		: undefined;
	const where = {
		type,
		clientId: session.user.clientId!,
	};

	const page = parseInt(searchParams.page) || 1;
	const pageSize = parseInt(searchParams.pageSize) || 20;

	const holdings = await prisma.holding?.findMany({
		where,
		orderBy: { title: "asc" },
		include: { locations: true },
		skip: (page - 1) * pageSize,
		take: pageSize,
	});

	const holdingCount = await prisma.holding.count({ where });

	if (!holdings || !holdings.length)
		return (
			<Main>
				<Flex direction="column" gap="3">
					<HoldingsToolbar />
					<NoDataMessage>
						There are currently no holdings for {session.user.clientName!}
						{searchParams.type ? ` with type ${searchParams.type}` : ""}.
					</NoDataMessage>
					<Pagination
						itemCount={holdingCount}
						pageSize={pageSize}
						currentPage={page}
					/>
				</Flex>
			</Main>
		);

	return (
		<Main>
			<Flex direction="column" gap="3">
				<HoldingsToolbar />
				<HoldingsTable searchParams={searchParams} holdings={holdings} />
				<Pagination
					itemCount={holdingCount}
					pageSize={pageSize}
					currentPage={page}
				/>
			</Flex>
		</Main>
	);
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "Salvify Medical Inventory - Holdings",
	description: "View all Inventory holdings",
};
export default HoldingListPage;
