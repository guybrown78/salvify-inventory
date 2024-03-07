import dynamic from 'next/dynamic';
import LocationFormSkeleton from '../../_components/LocationFormSkeleton';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { cache } from 'react';

const LocationForm = dynamic(
	() => import('../../_components/LocationForm'),
	{
		ssr: false,
		loading: () => <LocationFormSkeleton />
	}
);


interface LocationPageProps {
	params: { holdingId:string, locationId: string }
}

const fetchLocation = cache((id: number) => prisma.location.findUnique({
  where: { id: id },
}));

const EditLocationPage = async ({ params }: LocationPageProps) => {

	const location = await fetchLocation(parseInt(params.locationId))

	if(!location) notFound();


	return (
		<LocationForm 
			location={location}
			holdingId={parseInt(params.holdingId)} 
		/>
	)
}

export default EditLocationPage