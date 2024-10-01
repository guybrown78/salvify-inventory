'use client' 

import { useHoldingContext } from '@/app/_providers/HoldingProvider'
import { ReactNode, useEffect } from 'react'
import { HoldingWithLocations } from './holdingQuery'
import { Holding } from '@prisma/client'
import HoldingsMain from '@/app/_components/layout/HoldingsMain'
import { getSessionUser } from '@/app/_utils/getSessionUser'
import { useSessionUserContext } from '@/app/_providers/SessionUserProvider'
import { NoDataMessage, Skeleton } from '@/app/_components'

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
			<HoldingsMain>
				{/* <NoDataMessage>You do not have access to this holding.</NoDataMessage> */}
				<Skeleton className='mb-6' height="4rem"/>
				<Skeleton className='mb-2' width="50%"/>
				<Skeleton className='mb-2' width="33%" height="2rem"/>
			</HoldingsMain>
		)
	}
	return (
		<>
			{children}
		</>
	)
}

export default HoldingPageWrapper