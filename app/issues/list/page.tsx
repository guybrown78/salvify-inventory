import prisma from '@/prisma/client'
import { Table, TableCell, TableColumnHeaderCell } from '@radix-ui/themes'
import { Issue, IssueStatus } from '@prisma/client'
import { IssueStatusBadge, Link } from '@/app/components'
import NextLink from 'next/link';
import IssueToolbar from './IssueToolbar'
import { ArrowUpIcon } from '@radix-ui/react-icons';

interface Props {
	seatchParams: { status: IssueStatus, orderBy: keyof Issue }
}

const IssuesPage = async ({ searchParams }: Props) => {

	const columns:{ 
		label:string, 
		value: keyof Issue,
		className?:string
	}[] = [
		{ label: 'Issue', value: 'title'},
		{ label: 'Status', value: 'status', className:'hidden md:table-cell'},
		{ label: 'Created', value: 'createdAt', className:'hidden md:table-cell'},
	]

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
						{columns.map((column) => (
							<TableColumnHeaderCell key={column.value}>
								<NextLink href={{
									query: { 
										...searchParams, 
										orderBy:column.value
									}
								}}>
									{column.label}
								</NextLink>
								{column.value === searchParams.orderBy && <ArrowUpIcon className="inline" />}
							</TableColumnHeaderCell>
						))}
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