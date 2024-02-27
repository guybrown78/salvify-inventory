import prisma from '@/prisma/client'
import { Table, TableCell, TableColumnHeaderCell } from '@radix-ui/themes'
import { IssueStatus } from '@prisma/client'
import { IssueStatusBadge, Link } from '@/app/components'
import IssueToolbar from './IssueToolbar'

interface Props {
	seatchParams: { status: IssueStatus }
}

const IssuesPage = async ({ searchParams }: Props) => {

	const statuses = Object.values(IssueStatus)
	const status = statuses.includes(searchParams.status) 
		? searchParams.status 
		: undefined;
	const issues = await prisma.issue.findMany({
		where: { status: status }
	});

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

export const dynamic = 'force-dynamic';
// export const revalidate = 0;

export default IssuesPage