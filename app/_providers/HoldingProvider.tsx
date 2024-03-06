'use client'

import { Holding } from "@prisma/client";
import React, { ReactNode, useContext, useEffect, useState } from "react";

type holdingContextType = {
	isHoldingSelected:boolean,
	updateIsHoldingSelected:(flag:boolean) => void,
	currentHolding:Holding | null
	updateCurrentHolding:(holding?:Holding | null) => void
};

const HoldingContextDefaultValues: holdingContextType = {
	isHoldingSelected: false,
	updateIsHoldingSelected:(flag:boolean) => {},
	currentHolding: null,
	updateCurrentHolding:(holding?:Holding | null) => {},
};

const HoldingContext = React.createContext<holdingContextType>(HoldingContextDefaultValues);

export function useHoldingContext() {
	return useContext(HoldingContext);
}

type Props = {
	children: ReactNode;
};

export function HoldingProvider({ children }: Props) {


	const [isHoldingSelected, setIsHoldingSelected] = useState<boolean>(false);
	const [currentHolding, setcurrentHolding] = useState<Holding | null>(null);

	const updateIsHoldingSelected = (flag:boolean) => {
		setIsHoldingSelected(flag);
	};

	const updateCurrentHolding = (holding?:Holding | null) => {
		if(holding?.id){
			setcurrentHolding(holding);
		}else{
			setcurrentHolding(null);
		}
		
	};

	const value = {
		isHoldingSelected,
		updateIsHoldingSelected,

		currentHolding,
		updateCurrentHolding
	}

	useEffect(() => {
		if(currentHolding?.id){
			setIsHoldingSelected(true);
		}else{
			setIsHoldingSelected(false);
		}
	}, [currentHolding])

	return (
		<>
			<HoldingContext.Provider value={value}>
				{children}
			</HoldingContext.Provider>
		</>
	);
}
