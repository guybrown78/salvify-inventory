import { notFound } from 'next/navigation';
import HoldingHeader from '../HoldingHeader';
import { HoldingPageProps, fetchHolding } from '../page';
import HoldingPageWrapper from '../../_components/HoldingPageWrapper';

const HoldingStockItemUsagePage = async ({ params }: HoldingPageProps) => {
	const holding = await fetchHolding(parseInt(params.holdingId))

	if(!holding)
		notFound();
	
	return (
		<HoldingPageWrapper 
			holding={holding} 
			holdingId={parseInt(params.holdingId)}
		>
			<div>HoldingStockItemUsagePage</div>
		</HoldingPageWrapper>
	)
}

export default HoldingStockItemUsagePage