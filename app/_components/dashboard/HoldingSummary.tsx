import { HoldingSummaryType } from "@/app/_types/types";
import { Card, Flex, Grid, Inset, Text } from "@radix-ui/themes";
import classNames from "classnames";
import Link from "next/link";
import { IconType } from "react-icons";
import { FaArrowRight } from "react-icons/fa6";
import {
	HiOutlineArrowDownOnSquare,
	HiOutlineCalendar,
	HiOutlinePencilSquare,
} from "react-icons/hi2";
import HoldingSummaryListItem from "./HoldingSummaryListItem";

interface Props {
	removed: number;
	low: number;
	expiring: number;
	holdingId?: number | null;
	holdings?: HoldingSummaryType[] | null
}

const HoldingSummary = ({ removed, low, expiring, holdingId = null, holdings = null}: Props) => {
	const containers: {
		label: string;
		value: number;
		item: string;
		param: "low" | "expiring" | "removed"
		icon: IconType;
		color: string;
	}[] = [
		{
			label: "Recently used/removed (within 30 days)",
			value: removed,
			param: "removed",
			item: "removed-items",
			icon: HiOutlinePencilSquare,
			color: "text-green-600",
		},
		{
			label: "Low stock",
			value: low,
			param: "low",
			item: "low-stock-items",
			icon: HiOutlineArrowDownOnSquare,
			color: "text-amber-600",
		},
		{
			label: "Expiring (within 30 days)",
			value: expiring,
			param: "expiring",
			item: "expiring-items",
			icon: HiOutlineCalendar,
			color: "text-red-600",
		},
	];

	return (
		<Grid columns={{ initial: "1", md: "3" }} gap="4" mt="3">
			{containers.map((container) => (
				<Card key={container.label} className="bg-slate-50">
					<Flex justify="start" align="center" gap="2">
						<container.icon
							className={classNames(container.color, "text-3xl")}
						/>

						<Flex direction="column" gap="0">
							<Text size="2">{container.label}</Text>
							<Text
								size="7"
								className={classNames(container.color, "font-bold")}
							>
								{container.value} items
							</Text>
						</Flex>
					</Flex>

					<Inset side="bottom" pb="0" className="bg-slate-50">
						{
							holdingId && (
								<Link
									className="inline-flex items-center bg-slate-50 text-sm font-medium py-2 px-4 w-full mt-3"
									href={`/holdings/${holdingId}/${container.item}`}
								>
									View All
									<FaArrowRight className="ml-2" />
								</Link>
							)
						}
						{
							holdings && (
								<div className="pt-4">
								<Text size='1' className="py-2 px-4">Holdings Breakdown:</Text>
								{
									holdings.map(holding => (
										<HoldingSummaryListItem 
											key={holding.id}
											title={holding.title}
											type={holding.type}
											item={container.item}
											holdingId={holding.id}
											value={holding[container.param]}
											color={container.color}
										/>
									))
								}
								{
									holdings.length < 1 && (
										<Text as="div" size='1' align="center" className="py-2 px-4">There are currently no holdings.</Text>
									)
								}
								</div>
							)
						}
			
					</Inset>
				</Card>
			))}
		</Grid>
	);
};

export default HoldingSummary;
