import { notFound } from 'next/navigation';
import HoldingHeader from '../HoldingHeader';
import { HoldingPageProps, fetchHolding } from '../holdingQuery';
import HoldingPageWrapper from '../HoldingPageWrapper';

const HoldingDashboardPage = async ({ params }: HoldingPageProps) => {
	const holding = await fetchHolding(parseInt(params.holdingId))

	if(!holding)
		notFound();
	
	return (
		<>
			<HoldingPageWrapper holding={holding} holdingId={parseInt(params.holdingId)}>
				<HoldingHeader holding={holding} />
			</HoldingPageWrapper>
		</>

	)
}

export default HoldingDashboardPage