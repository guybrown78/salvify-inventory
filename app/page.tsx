import Image from 'next/image'
import { Pagination } from '@/app/components'
import LatestIssues from './LatestIssues'
import IssueSummary from './IssueSummary'
import prisma from '@/prisma/client'
import IssueChart from './IssueChart'

export default async function Home() {

	const open = await prisma.issue.count({ where: { status: 'OPEN'}});
	const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS'}});
	const closed = await prisma.issue.count({ where: { status: 'CLOSE'}});

  return (
    <div>
			<IssueSummary open={open} inProgress={inProgress} closed={closed} />
			<LatestIssues />
			<IssueChart open={open} inProgress={inProgress} closed={closed} />
		</div>
  )
}
