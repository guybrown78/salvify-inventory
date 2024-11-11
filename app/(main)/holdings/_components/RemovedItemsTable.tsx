import InstanceExpiryDate from "@/app/_components/InstanceExpiryDate";
import { RemoveInstanceWithItemLocationUser } from "@/app/_types/types";
import {
	Flex,
	Table,
	TableCell,
	TableColumnHeaderCell,
} from "@radix-ui/themes";
import NextLink from "next/link";

import LabelValueColumn from "@/app/_components/LabelValueColumn";
import { removeInstanceReasonList } from "@/prisma/enums";

export interface RemoveInstanceQuery {
	orderBy: keyof RemoveInstanceWithItemLocationUser;
	page: string;
}

interface Props {
	removedInstances: RemoveInstanceWithItemLocationUser[];
}

const RemovedItemsTable = ({ removedInstances }: Props) => {
	return (
		<Table.Root variant="surface">
			<Table.Header>
				<Table.Row>
					{columns.map((column) => (
						<TableColumnHeaderCell
							key={column.value}
							className={column.className}
						>
							<NextLink
								href={{
									query: {
										orderBy: column.value,
									},
								}}
							>
								{column.label}
							</NextLink>
						</TableColumnHeaderCell>
					))}
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{removedInstances.map((instance) => (
					<Table.Row key={instance.id}>
						<TableCell>
							{instance.instance.item.title}
							<div className="mt-3 block md:hidden">
								<Flex direction="column" gap="3">
									<Flex gap="5" justify="between">
										<LabelValueColumn label="Quantity">
											{instance.quantity}
										</LabelValueColumn>

										<LabelValueColumn label="Location">
											{instance.location.title}
										</LabelValueColumn>

										<LabelValueColumn label="Reason">
											{
												removeInstanceReasonList.filter(
													(reason) => reason.value === instance.reason
												)[0].label
											}
										</LabelValueColumn>
									</Flex>
									<Flex gap="5" justify="between">

										<LabelValueColumn label="PRF">
											{instance.prf ? String(instance.prf) : "-"}
										</LabelValueColumn>

										<LabelValueColumn label="Removed date">
											<InstanceExpiryDate
												expiryDate={instance.removedAt}
												showCountdown={false}
											/>
										</LabelValueColumn>
										<LabelValueColumn label="Removed by">
											{instance.removedBy.name}
										</LabelValueColumn>
									</Flex>
								</Flex>
							</div>
						</TableCell>
						<TableCell className="hidden md:table-cell">
							{instance.quantity}
						</TableCell>

						<TableCell className="hidden md:table-cell">
							{instance.location.title}
						</TableCell>

						<TableCell className="hidden md:table-cell">
							{
								removeInstanceReasonList.filter(
									(reason) => reason.value === instance.reason
								)[0].label
							}
						</TableCell>

						<TableCell className="hidden md:table-cell">
							{instance.prf ? String(instance.prf) : "-"}
						</TableCell>

						<TableCell className="hidden md:table-cell">
							<InstanceExpiryDate
								expiryDate={instance.removedAt}
								showCountdown={false}
							/>
						</TableCell>
						<TableCell className="hidden md:table-cell">
							{instance.removedBy.name}
						</TableCell>
					</Table.Row>
				))}
			</Table.Body>
		</Table.Root>
	);
};

const columns: {
	label: string;
	value?: any;
	className?: string;
}[] = [
	{ label: "Item", value: "title" },
	{ label: "Quantity", value: "quantity", className: "hidden md:table-cell" },
	{ label: "Location", value: "location", className: "hidden md:table-cell" },
	{ label: "Reason", value: "reason", className: "hidden md:table-cell" },
	{ label: "PRF", value: "prf", className: "hidden md:table-cell" },
	{ label: "Removed date", value: "date", className: "hidden md:table-cell" },
	{ label: "Removed by", value: "user", className: "hidden md:table-cell" },
];

export default RemovedItemsTable;
