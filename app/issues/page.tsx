import { Table, TableCell, TableColumnHeaderCell } from '@radix-ui/themes'
import prisma from '@/prisma/client'
import IssueStatusBadge from '../components/IssueStatusBadge'
import Link from '../components/Link'
import IssueToolbar from './IssueToolbar'
const IssuesPage = async () => {
	const issues = await prisma.issue.findMany();
	// await delay(200);
	return (
		<div>
			<IssueToolbar />
			<Table.Root variant='surface'>
				<Table.Header>
					<Table.Row>
						<TableColumnHeaderCell>Issue</TableColumnHeaderCell>
						<TableColumnHeaderCell className='hidden md:table-cell'>Status</TableColumnHeaderCell>
						<TableColumnHeaderCell className='hidden md:table-cell'>Created</TableColumnHeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{issues.map(issue => (
						<Table.Row key={issue.id}>
							<TableCell>
								<Link href={`/issues/${issue.id}`}>
									{issue.title}
								</Link>	
								<div className="block md:hidden">
									<IssueStatusBadge issueStatus={issue.status} />
								</div>
							</TableCell>
							<TableCell className='hidden md:table-cell'>
								<IssueStatusBadge issueStatus={issue.status} />
							</TableCell>
							<TableCell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</TableCell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</div>
	)
}

export default IssuesPage