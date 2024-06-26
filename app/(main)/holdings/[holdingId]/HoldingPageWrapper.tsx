'use client' 

import { useHoldingContext } from '@/app/_providers/HoldingProvider'
import { ReactNode, useEffect } from 'react'
import { HoldingWithLocations } from './holdingQuery'
import { Holding } from '@prisma/client'
import HoldingsMain from '@/app/_components/layout/HoldingsMain'
import { getSessionUser } from '@/app/_utils/getSessionUser'
import { useSessionUserContext } from '@/app/_providers/SessionUserProvider'

export interface Props {
	children: ReactNode
	holdingId: number
	holding: HoldingWithLocations
}

const HoldingPageWrapper = ({ children, holdingId, holding }: Props) => {

	const { isHoldingSelected, currentHolding, updateIsHoldingSelected, updateCurrentHolding } = useHoldingContext()

	useEffect(() => {
		if(!currentHolding || holdingId !== currentHolding.id){
			updateCurrentHolding(holding as Holding);
		}
	}, [holdingId])

	// Check Current Holding and clientId!
	const { sessionUser } = useSessionUserContext()

	if(sessionUser?.clientId !== currentHolding?.clientId){
		return (
			<>
				<p>Nop</p>
			</>
		)
	}
	return (
		<>
			{children}
		</>
	)
}

export default HoldingPageWrapper