import React, { ReactNode } from "react";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import clsx from "clsx";

export interface OverviewContainerType
{
	label: string;
	value: string | ReactNode;
	color?: "red" | "green" | "gray";
	className?: string;
}


interface Props{
	containers:OverviewContainerType[]
}
const StockItemOverviewContainers = ({containers}: Props) => {
	return (
		<div className="grid grid-cols-12 gap-4">
			{containers.map((container) => (
				<Card
					key={container.label}
					className={clsx(
						container.className
							? container.className
							: "col-span-4 xl:col-span-2"
					)}
				>
					<Flex direction="column" gap="1">
						<Text size="2" align="center" color="gray">
							{container.label}
						</Text>
						<Text size="5" className="font-bold" align="center" color={container.color || "gray"}>
							{container.value}
						</Text>
					</Flex>
				</Card>
			))}
		</div>
	)
}

export default StockItemOverviewContainers