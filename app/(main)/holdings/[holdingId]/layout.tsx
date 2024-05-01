import HoldingsMain from '@/app/_components/layout/HoldingsMain'
import React, { ReactNode } from 'react'
import { notFound } from 'next/navigation';
import { fetchHolding } from './holdingQuery';
import HoldingPageWrapper from './HoldingPageWrapper';

interface Props {
	params: { holdingId: string }
	children: ReactNode
}

const HoldingsLayout = async ({ params, children }:Props) => {

	const holding = await fetchHolding(parseInt(params.holdingId));

	if(!holding)
		notFound();

	
	return (
		<HoldingPageWrapper 
			holding={holding} 
			holdingId={parseInt(params.holdingId)}
		>
			<HoldingsMain>
				{children}
			</HoldingsMain>
		</HoldingPageWrapper>
	
	)
}

export default HoldingsLayout