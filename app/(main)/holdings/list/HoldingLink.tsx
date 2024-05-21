"use client";
import { Link } from "@/app/_components";
import { useHoldingContext } from "@/app/_providers/HoldingProvider";
import { Box, Flex, Text } from "@radix-ui/themes";
import { useRouter } from 'next/navigation';
import { HoldingWithLocations } from "@/app/_types/types";

const HoldingLink = ({ holding }: { holding: HoldingWithLocations }) => {
	const { updateIsHoldingSelected, updateCurrentHolding } = useHoldingContext();
	const router = useRouter()
	// href={`/holdings/${holding.id}/dashboard`}
	return (

		<Flex direction="column" gap="1">
			<Text 
				weight="bold" 
				color="green" 
				as="div" 
				className="cursor-pointer hover:underline"
				onClick={() => {
					updateCurrentHolding(holding)
					router.push(`/holdings/${holding.id}/dashboard`)
				}}>{holding.title}</Text>
			<Text size="2">{holding.field}</Text>
		</Flex>
	);
};

export default HoldingLink;
