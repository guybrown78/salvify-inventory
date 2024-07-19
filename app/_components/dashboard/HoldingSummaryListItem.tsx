
import { HoldingType } from "@prisma/client";
import { Box, Grid, Text } from "@radix-ui/themes";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

interface Props {
	title: string;
	type: HoldingType;
	value: number;
	item: string;
	holdingId: number;
	color: string
}
const HoldingSummaryListItem = ({ title, type, value, holdingId, color, item }:Props) => {
	return (
		<Link
			key={holdingId}
			href={`/holdings/${holdingId}/${item}`}
			className="group inline-flex items-center bg-slate-50 text-sm font-medium py-2 px-4 w-full cursor-pointer hover:bg-slate-100"
		>
			<div className="w-full grid grid-cols-6 gap-2">
				<div className="col-span-4">
					<Text>{title}</Text>
				</div>
				<Text>{ value }</Text>
				<div className="flex justify-end">
					<FaArrowRight />
				</div>
			</div>
		</Link>
	)
}

export default HoldingSummaryListItem