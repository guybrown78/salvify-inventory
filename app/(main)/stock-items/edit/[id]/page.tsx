import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'
import dynamic from 'next/dynamic'
import StockItemFormSkeleton from '../../_components/StockItemFormSkeleton';

const StockItemForm = dynamic(
	() => import('../../_components/StockItemForm'),
	{
		ssr: false,
		loading: () => <StockItemFormSkeleton />
	}
);


interface Props {
	params: { id: string }
}
const StockItemEditPage = async ({ params}: Props) => {

	const item = await prisma.item.findUnique({
		where: { id: parseInt(params.id) }
	})

	if(!item) notFound();

	return (
		<StockItemForm item={item} />
	)
}

export default StockItemEditPage