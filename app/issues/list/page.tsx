import { Pagination } from '@/app/components';
import prisma from '@/prisma/client';
import { IssueStatus } from '@prisma/client';
import IssueTable, { IssueQuery, columnNames } from './IssueTable';
import IssueToolbar from './IssueToolbar';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';

interface Props {
	seatchParams: IssueQuery
}

const IssuesPage = async ({ searchParams }: Props) => {

	const statuses = Object.values(IssueStatus)
	const status = statuses.includes(searchParams.status) 
		? searchParams.status 
		: undefined;
	const where = { status };

	const orderBy = columnNames
		.includes(searchParams.orderBy)
			? { [searchParams.orderBy]: 'asc' }
			: undefined
	
	const page = parseInt(searchParams.page) || 1
	const pageSize = 10;
	
	
	const issues = await prisma.issue.findMany({
		where,
		orderBy,
		skip: (page - 1) * pageSize,
		take: pageSize
	});

	const issueCount = await prisma.issue.count({ where });

	return (
		<Flex direction="column" gap="3">
			<IssueToolbar />
			<IssueTable searchParams={searchParams} issues={issues} />
			<Pagination 
				itemCount={issueCount} 
				pageSize={pageSize} 
				currentPage={page}
			/>
		</Flex>
	)
}

export const dynamic = 'force-dynamic';
// export const revalidate = 0;

export const metadata: Metadata = {
	title: 'Salvify Medical Inventory - Issues',
	description: 'View all Inventory issues'
}

export default IssuesPage