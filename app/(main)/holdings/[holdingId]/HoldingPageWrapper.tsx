"use client";

import HoldingsMain from "@/app/_components/layout/HoldingsMain";
import { useHoldingContext } from "@/app/_providers/HoldingProvider";
import { Holding } from "@prisma/client";
import { ReactNode, useEffect } from "react";
import { HoldingWithLocations } from "./holdingQuery";

import { Skeleton } from "@/app/_components";
import { useSession } from "next-auth/react";

export interface Props {
	children: ReactNode;
	holdingId: number;
	holding: HoldingWithLocations;
}

const HoldingPageWrapper = ({ children, holdingId, holding }: Props) => {
	const {
		isHoldingSelected,
		currentHolding,
		updateIsHoldingSelected,
		updateCurrentHolding,
	} = useHoldingContext();

	const { data: session } = useSession();

	useEffect(() => {
		if (!currentHolding || holdingId !== currentHolding.id) {
			updateCurrentHolding(holding as Holding);
		}
	}, [holdingId]);

	// Check Current Holding and clientId!

	if (!session?.user) {
		return (
			<HoldingsMain>
				<Skeleton className="mb-6" height="4rem" />
				<Skeleton className="mb-2" width="50%" />
				<Skeleton className="mb-2" width="33%" height="2rem" />
			</HoldingsMain>
		);
	}

	if (session.user.clientId! !== currentHolding?.clientId) {
		return (
			<HoldingsMain>
				{/* <NoDataMessage>You do not have access to this holding.</NoDataMessage> */}
				<Skeleton className="mb-6" height="4rem" />
				<Skeleton className="mb-2" width="50%" />
				<Skeleton className="mb-2" width="33%" height="2rem" />
			</HoldingsMain>
		);
	}
	return <>{children}</>;
};

export default HoldingPageWrapper;
