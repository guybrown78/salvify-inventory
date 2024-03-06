'use client' 

import React, { useEffect, ReactNode } from 'react'
import { fetchHolding } from '../[holdingId]/page'
import { useHoldingContext } from '@/app/_providers/HoldingProvider'
import { Holding } from '@prisma/client'


export interface Props {
	children: ReactNode
	holdingId: number
	holding: Holding
}

const HoldingPageWrapper = ({ children, holdingId, holding }: Props) => {

	const { isHoldingSelected, currentHolding, updateIsHoldingSelected, updateCurrentHolding } = useHoldingContext()

	useEffect(() => {
		if(!currentHolding || holdingId !== currentHolding.id){
			updateCurrentHolding(holding);
		}

	}, [holdingId])

	return (
		<>
			{children}
		</>
	)
}

export default HoldingPageWrapper