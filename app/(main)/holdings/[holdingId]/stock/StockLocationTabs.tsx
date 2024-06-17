"use client";

import { useHoldingContext } from "@/app/_providers/HoldingProvider";
import { Location } from "@prisma/client";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Flex, Tabs } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import './styles.css';
interface Props {
	locations: Location[];
}

const StockLocationTabs = ({ locations }: Props) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { currentHolding } = useHoldingContext();
	return (
		<ScrollArea.Root className="ScrollAreaRoot">
			<ScrollArea.Viewport className="ScrollAreaViewport">
				{/*  */}
				<Flex justify="between">
					<Tabs.Root
						className="w-full"
						defaultValue={searchParams.get("location") || ""}
						onValueChange={(location) => {
							const params = new URLSearchParams();
							if (location) params.append("location", location);
							// add order / pag etc
							const query = params.size ? "?" + params.toString() : "";
							router.push(`/holdings/${currentHolding!.id}/stock` + query);
						}}
					>
						<Tabs.List>
							<Tabs.Trigger value="">All</Tabs.Trigger>
							{locations.map((location) => (
								<Tabs.Trigger key={location.id} value={String(location.id)}>
									{location.title}
								</Tabs.Trigger>
							))}
						</Tabs.List>
					</Tabs.Root>
				</Flex>
				{/*  */}
			</ScrollArea.Viewport>
			<ScrollArea.Scrollbar
				className="ScrollAreaScrollbar"
				orientation="horizontal"
			>
				<ScrollArea.Thumb className="ScrollAreaThumb" />
			</ScrollArea.Scrollbar>
			<ScrollArea.Corner className="ScrollAreaCorner" />
		</ScrollArea.Root>
	);
};

export default StockLocationTabs;
