import dynamic from 'next/dynamic'
import FormSkeleton from '../../../_components/FormSkeleton';
import { HoldingPageProps, fetchHolding } from '../../holdingQuery';
import HoldingPageWrapper from '../../HoldingPageWrapper';
import { notFound } from 'next/navigation';

const LocationForm = dynamic(
	() => import('../../../_components/LocationForm'),
	{
		ssr: false,
		loading: () => <FormSkeleton />
	}
);

const NewLocationPage = async ({ params }: HoldingPageProps) => {
	const holding = await fetchHolding(parseInt(params.holdingId))

	if(!holding)
		notFound();

	return (
		<HoldingPageWrapper 
			holding={holding} 
			holdingId={parseInt(params.holdingId)}
		>
			<LocationForm holdingId={parseInt(params.holdingId)} />
		</HoldingPageWrapper>
		
	)
}

export default NewLocationPage