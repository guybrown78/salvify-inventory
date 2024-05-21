
import { HoldingType } from "@prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import {
	Button,
	Flex,
	IconButton,
	Table,
	TableCell,
	TableColumnHeaderCell,
} from "@radix-ui/themes";
import NextLink from "next/link";

import { HoldingWithLocations } from "@/app/_types/types";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import DeleteHoldingButton from "./DeleteHoldingButton";
import HoldingLink from "./HoldingLink";
import LabelValueColumn from "@/app/_components/LabelValueColumn";

export interface HoldingQuery {
	type: HoldingType;
	orderBy: keyof HoldingWithLocations;
	page: string;
}

interface Props {
	searchParams: HoldingQuery;
	holdings: HoldingWithLocations[];
}

const HoldingsTable = ({ searchParams, holdings }: Props) => {

	return (
		<Table.Root variant="surface">
			<Table.Header>
				<Table.Row>
					{columns.map((column) => (
						<TableColumnHeaderCell
							key={column.value}
							className={column.className}
						>
							{column.value && (
								<NextLink
									href={{
										query: {
											...searchParams,
											orderBy: column.value,
										},
									}}
								>
									{column.label}
								</NextLink>
							)}
							{!column.value && <>{column.label}</>}
							{column.value === searchParams.orderBy && (
								<ArrowUpIcon className="inline" />
							)}
						</TableColumnHeaderCell>
					))}
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{holdings.map((holding) => (
					<Table.Row key={holding.id}>
						<TableCell>
							<HoldingLink holding={holding} />
							<div className="block md:hidden">
								<Flex gap="5" mt="3" justify="between">
									<LabelValueColumn label="Main" >-</LabelValueColumn>
									<LabelValueColumn label="Type" >{holding.type}</LabelValueColumn>
									<LabelValueColumn label="Locations" >{holding.locations.length}</LabelValueColumn>
								</Flex>
								<Flex gap="5" mt="3" justify="end">
									<NextLink
										href={`/holdings/edit/${holding.id}`}
										className="my-auto"
									>
										<Button variant="ghost">
											<Pencil2Icon/> Edit
										</Button>
									</NextLink>
									<DeleteHoldingButton />
								</Flex>
							</div>
						</TableCell>

						<TableCell className='hidden md:table-cell'>-</TableCell>
						<TableCell className='hidden md:table-cell'>{holding.type}</TableCell>
						<TableCell className='hidden md:table-cell'>{holding.locations.length}</TableCell>

						<TableCell className='hidden md:table-cell'>
							<NextLink
								href={`/holdings/edit/${holding.id}`}
								className="my-auto"
							>
								<Button variant="ghost">
									<Pencil2Icon/> Edit
								</Button>
							</NextLink>
						</TableCell>

						<TableCell className='hidden md:table-cell'>
							<DeleteHoldingButton />
						</TableCell>
					</Table.Row>
				))}
			</Table.Body>
		</Table.Root>
	);
};

const columns: {
	label: string;
	value: keyof HoldingWithLocations | null;
	className?: string;
}[] = [
	{ label: "Holding", value: "title" },
	{
		label: "Is Main",
		value: "isMainHolding",
		className: "hidden md:table-cell",
	},
	{ label: "Type", value: "type", className: "hidden md:table-cell" },
	{ label: "Locations", value: null, className: "hidden md:table-cell" },
	{ label: "", value: null, className: "hidden md:table-cell" },
	{ label: "", value: null, className: "hidden md:table-cell" },
];

export const columnNames = columns.map((column) => column.value);
export default HoldingsTable;
