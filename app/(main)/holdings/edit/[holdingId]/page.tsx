import prisma from '@/prisma/client';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import HoldingFormSkeleton from '../../_components/HoldingFormSkeleton';
import Main from '@/app/_components/layout/Main';

const HoldingForm = dynamic(
	() => import('../../_components/HoldingForm'),
	{
		ssr: false,
		loading: () => <HoldingFormSkeleton />
	}
);


interface HoldingPageProps {
	params: { holdingId: string }
}

const fetchHolding = cache((id: number) => prisma.holding.findUnique({
  where: { id: id },
  include: { locations: true },
}));

const EditHoldingPage = async ({ params }: HoldingPageProps) => {

	const holding = await fetchHolding(parseInt(params.holdingId))

	if(!holding) notFound();

	return (
		<Main>
			<HoldingForm holding={holding} />
		</Main>
	)
}

export default EditHoldingPage