import { cache } from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import HoldingHeader from './HoldingHeader';

interface Props {
	params: { id: string }
}

const fetchHolding = cache((holdingId: number) => prisma.holding.findUnique({
	where: { id: holdingId }
}));

const HoldingPage = async ({ params }: Props) => {

	const holding = await fetchHolding(parseInt(params.id));

	if(!holding)
		notFound();

	return (
		<HoldingHeader holding={holding} />
	)
}

export default HoldingPage