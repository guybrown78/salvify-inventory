import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import AssigneeSelect from './AssigneeSelect';
import { cache } from 'react';

interface Props {
	params: { id: string }
}

const fetchItem = cache((itemId: number) => prisma.item.findUnique({
	where: { id: itemId }
}));


const StockItemPage = async ({ params }: Props) => {

	const session = await getServerSession(authOptions)

	const item = await fetchItem(parseInt(params.id));

	if(!item)
		notFound();

	return (
		<div>{ item.title }</div>
	)
}

export async function generateMetadata({ params }:Props){
	const item = await fetchItem(parseInt(params.id));

	return {
		title: item?.title,
		description: 'Details of stock item ' + item?.id
	}
}

export default StockItemPage