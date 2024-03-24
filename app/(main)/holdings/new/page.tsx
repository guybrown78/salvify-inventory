import dynamic from 'next/dynamic'
import HoldingFormSkeleton from '../_components/HoldingFormSkeleton';
import Main from '@/app/_components/layout/Main'
const HoldingForm = dynamic(
	() => import('../_components/HoldingForm'),
	{
		ssr: false,
		loading: () => <HoldingFormSkeleton />
	}
);

const NewHoldingPage = () => {
	return (
		<Main>
			<HoldingForm />
		</Main>
		
	)
}

export default NewHoldingPage