import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import ClientHeader from "../_components/client/ClientHeader";
import IssueChart from "../_components/dashboard/IssueChart";
import IssueSummary from "../_components/dashboard/IssueSummary";
import LatestIssues from "../_components/dashboard/LatestIssues";
import Main from "../_components/layout/Main";

export default async function Home() {
	const session = await getServerSession(authOptions);

	const open = await prisma.issue.count({ where: { status: "OPEN" } });
	const inProgress = await prisma.issue.count({
		where: { status: "IN_PROGRESS" },
	});
	const closed = await prisma.issue.count({ where: { status: "CLOSE" } });

	return (
		<Main>
			<Flex direction="column" gap="5">
				<ClientHeader />
				<Grid columns={{ initial: "1", md: "2" }} gap="5" mt="8">
					<Flex direction="column" gap="5">
						<IssueSummary open={open} inProgress={inProgress} closed={closed} />
						<IssueChart open={open} inProgress={inProgress} closed={closed} />
					</Flex>
					<LatestIssues />
				</Grid>
			</Flex>
		</Main>
	);
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "Salvify Medical Inventory - Dashboard",
	description: "Analysis on all Items, Instances and Holdings",
};
