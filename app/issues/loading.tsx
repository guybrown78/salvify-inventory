import { Table, TableCell, TableColumnHeaderCell } from '@radix-ui/themes'
import { Skeleton } from '@/app/components'
import IssueToolbar from './IssueToolbar'

const LoadingIssuesPage = () => {
	const issues = [1,2,3,4,5];
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
							<Table.Row key={issue}>
								<TableCell>
									<Skeleton />
									<div className="block md:hidden">
										<Skeleton />
									</div>
								</TableCell>
								<TableCell className='hidden md:table-cell'>
									<Skeleton />
								</TableCell>
								<TableCell className='hidden md:table-cell'><Skeleton /></TableCell>
							</Table.Row>
						))}
					</Table.Body>
			</Table.Root>
		</div>
		
	)
}

export default LoadingIssuesPage