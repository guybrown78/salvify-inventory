import { IssueStatusBadge, Link } from '@/app/_components';
import { Issue, IssueStatus } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Table, TableCell, TableColumnHeaderCell } from '@radix-ui/themes';
import NextLink from 'next/link';

export interface IssueQuery {
	status: IssueStatus;
	orderBy: keyof Issue;
	page: string;
	pageSize: string;
}
interface Props {
	searchParams: IssueQuery,
	issues: Issue[]
}

const IssueTable = ({ searchParams, issues }: Props) => {

	return (
		<Table.Root variant='surface'>
				<Table.Header>
					<Table.Row>
						{columns.map((column) => (
							<TableColumnHeaderCell 
								key={column.value} 
								className={column.className}
							>
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
	)
}

const columns:{ 
	label:string, 
	value: keyof Issue,
	className?:string
}[] = [
	{ label: 'Issue', value: 'title'},
	{ label: 'Status', value: 'status', className:'hidden md:table-cell'},
	{ label: 'Created', value: 'createdAt', className:'hidden md:table-cell'},
]

export const columnNames = columns.map(column => column.value);
export default IssueTable