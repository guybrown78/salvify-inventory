import Image from 'next/image'
import { Pagination } from '@/app/_components'
import LatestIssues from '../_components/dashboard/LatestIssues'
import IssueSummary from '../_components/dashboard/IssueSummary'
import prisma from '@/prisma/client'
import IssueChart from '../_components/dashboard/IssueChart'
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import { Flex, Grid } from '@radix-ui/themes'
import { Metadata } from 'next'

export default async function Home() {

	const session = await getServerSession(authOptions)

	const open = await prisma.issue.count({ where: { status: 'OPEN'}});
	const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS'}});
	const closed = await prisma.issue.count({ where: { status: 'CLOSE'}});

  return (
		<>
			<h1>Hello {session && <span>{session.user!.name}</span>}</h1>
			<Grid columns={{ initial: "1", md: "2"}} gap="5">
				<Flex direction="column" gap="5">
					<IssueSummary open={open} inProgress={inProgress} closed={closed} />
					<IssueChart open={open} inProgress={inProgress} closed={closed} />
				</Flex>
				<LatestIssues />
			</Grid>
		</>
		
  )
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: 'Salvify Medical Inventory - Dashboard',
	description: 'Analysis on all Items, Instances and Holdings'
}