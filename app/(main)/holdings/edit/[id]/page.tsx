import dynamic from 'next/dynamic'
import HoldingFormSkeleton from '../../_components/HoldingFormSkeleton';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';

const HoldingForm = dynamic(
	() => import('../../_components/HoldingForm'),
	{
		ssr: false,
		loading: () => <HoldingFormSkeleton />
	}
);

interface Props {
	params: { id: string }
}

const EditHoldingPage = async ({ params }: Props) => {

	const holding = await prisma.holding.findUnique({
		where: { id: parseInt(params.id) }
	})

	if(!holding) notFound();

	return (
		<HoldingForm holding={holding} />
	)
}

export default EditHoldingPage