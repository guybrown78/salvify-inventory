import authOptions from '@/app/auth/authOptions';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
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