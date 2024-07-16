import { notFound } from 'next/navigation';
import { HoldingPageProps, fetchHolding } from './holdingQuery';
import HoldingHeader from '../_components/HoldingHeader';

const HoldingPage = async ({ params }: HoldingPageProps) => {

	const holding = await fetchHolding(parseInt(params.holdingId));

	if(!holding)
		notFound();

	return (
		<HoldingHeader holding={holding} />
	)
}

export default HoldingPage