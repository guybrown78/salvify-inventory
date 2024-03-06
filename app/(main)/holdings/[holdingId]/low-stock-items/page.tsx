import { notFound } from 'next/navigation';
import HoldingHeader from '../HoldingHeader';
import { HoldingPageProps, fetchHolding } from '../page';
import HoldingPageWrapper from '../../_components/HoldingPageWrapper';

const HoldingLowStockItemsPage = async ({ params }: HoldingPageProps) => {
	const holding = await fetchHolding(parseInt(params.holdingId))

	if(!holding)
		notFound();
	
	return (
		<HoldingPageWrapper 
			holding={holding} 
			holdingId={parseInt(params.holdingId)}
		>
			<div>HoldingLowStockItemsPage</div>
		</HoldingPageWrapper>
	)
}

export default HoldingLowStockItemsPage