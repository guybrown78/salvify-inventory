import { cache } from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import HoldingHeader from './HoldingHeader';

export interface HoldingPageProps {
	params: { holdingId: string }
}

export const fetchHolding = cache((id: number) => prisma.holding.findUnique({
	where: { id: id }
}));

const HoldingPage = async ({ params }: HoldingPageProps) => {

	const holding = await fetchHolding(parseInt(params.holdingId));

	if(!holding)
		notFound();

	return (
		<HoldingHeader holding={holding} />
	)
}

export default HoldingPage