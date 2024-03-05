import dynamic from 'next/dynamic'
import HoldingFormSkeleton from '../_components/HoldingFormSkeleton';

const HoldingForm = dynamic(
	() => import('../_components/HoldingForm'),
	{
		ssr: false,
		loading: () => <HoldingFormSkeleton />
	}
);

const NewHoldingPage = () => {
	return (
		<HoldingForm />
	)
}

export default NewHoldingPage