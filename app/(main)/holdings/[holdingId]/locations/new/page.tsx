import dynamic from 'next/dynamic'
import LocationFormSkeleton from '../_components/LocationFormSkeleton';
import { HoldingPageProps, fetchHolding } from '../../holdingQuery';
import { notFound } from 'next/navigation';

const LocationForm = dynamic(
	() => import('../_components/LocationForm'),
	{
		ssr: false,
		loading: () => <LocationFormSkeleton />
	}
);

const NewLocationPage = async ({ params }: HoldingPageProps) => {
	const holding = await fetchHolding(parseInt(params.holdingId))

	if(!holding)
		notFound();

	return (
		<LocationForm holdingId={parseInt(params.holdingId)} />

	)
}

export default NewLocationPage