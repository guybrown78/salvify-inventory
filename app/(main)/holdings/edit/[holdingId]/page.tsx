import dynamic from 'next/dynamic'
import HoldingFormSkeleton from '../../_components/HoldingFormSkeleton';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { HoldingPageProps, fetchHolding } from '../../[holdingId]/page';

const HoldingForm = dynamic(
	() => import('../../_components/HoldingForm'),
	{
		ssr: false,
		loading: () => <HoldingFormSkeleton />
	}
);

const EditHoldingPage = async ({ params }: HoldingPageProps) => {

	const holding = await fetchHolding(parseInt(params.holdingId))

	if(!holding) notFound();

	return (
		<HoldingForm holding={holding} />
	)
}

export default EditHoldingPage