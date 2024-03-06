import { notFound } from 'next/navigation';
import { HoldingPageProps, fetchHolding } from './holdingQuery';
import HoldingHeader from './HoldingHeader';
import HoldingPageWrapper from './HoldingPageWrapper';

const HoldingPage = async ({ params }: HoldingPageProps) => {

	const holding = await fetchHolding(parseInt(params.holdingId));

	if(!holding)
		notFound();

	return (
		<HoldingPageWrapper holding={holding} holdingId={parseInt(params.holdingId)}>
			<HoldingHeader holding={holding} />
		</HoldingPageWrapper>
	)
}

export default HoldingPage