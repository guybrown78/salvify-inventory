import { NoDataMessage } from "@/app/_components";
import InstanceExpiryDate from "@/app/_components/InstanceExpiryDate";
import RemoveInstanceDialog from "@/app/_components/remove/RemoveInstanceDialog";
import SwapInstanceDialog from "@/app/_components/swap/SwapInstanceDialog";
import { ItemWithInstances } from "@/app/_types/types";
import {
	Flex,
	Table,
	TableCell,
	TableColumnHeaderCell,
	Text,
} from "@radix-ui/themes";

interface Props {
	item: ItemWithInstances;
	holdingId?: number;
}
const StockInstanceTable = ({ item, holdingId }: Props) => {
	if (!item.instances) {
		return null;
	}
	if (!item.instances.length)
		return (
			<NoDataMessage>
				There are currently no instances for this item in this holding
			</NoDataMessage>
		);

	return (
		<Table.Root variant="surface">
			<Table.Header>
				<Table.Row>
					{columns.map((column) => (
						<TableColumnHeaderCell
							key={column.value}
							className={column.className}
						>
							{column.label}
						</TableColumnHeaderCell>
					))}
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{item.instances.map((instance) => (
					<Table.Row key={instance.id} align="center">
						<TableCell>
							<Flex direction="column" gap="3">
								<Flex align="center" gap="3">
									<Text weight="bold">{instance.location.title}</Text>
									<Text className="md:hidden">
										<em>(Stock quantity: {instance.quantity})</em>
									</Text>
								</Flex>
								<div className="flex flex-col gap-3 justify-center md:hidden">
									{instance.batch && (
										<Text>
											<em>Batch: {instance.batch}</em>
										</Text>
									)}
									<Flex align="center" gap="3">
										<Text>
											<em>Expiring:</em>
										</Text>
										<InstanceExpiryDate
											expiryDate={instance.expiryDate}
											showCountdown
										/>
									</Flex>
									<Flex align="center" gap="3" justify="end">
										<SwapInstanceDialog instance={instance} item={item} />
										<RemoveInstanceDialog
											instance={instance}
											item={item}
											holdingId={holdingId}
										/>
									</Flex>
								</div>
							</Flex>
						</TableCell>
						<TableCell className="hidden md:table-cell">
							{instance.quantity}
						</TableCell>
						<TableCell className="hidden md:table-cell">
							{instance.batch}
						</TableCell>
						<TableCell className="hidden md:table-cell">
							<InstanceExpiryDate
								expiryDate={instance.expiryDate}
								showCountdown
							/>
						</TableCell>

						<TableCell className="hidden md:table-cell" justify="end">
							<SwapInstanceDialog instance={instance} item={item} />
						</TableCell>

						<TableCell className="hidden md:table-cell" justify="end">
							<RemoveInstanceDialog
								instance={instance}
								item={item}
								holdingId={holdingId}
							/>
						</TableCell>
					</Table.Row>
				))}
			</Table.Body>
		</Table.Root>
	);
};

export const dynamic = "force-dynamic";

export default StockInstanceTable;

const columns: {
	label: string;
	value: string;
	className?: string;
}[] = [
	{ label: "location", value: "location" },
	{ label: "Stock", value: "quantity", className: "hidden md:table-cell" },
	{ label: "Batch", value: "batch", className: "hidden md:table-cell" },
	{ label: "Expiring", value: "expiryDate", className: "hidden md:table-cell" },
	{ label: "", value: "swap", className: "hidden md:table-cell" },
	{ label: "", value: "deduct", className: "hidden md:table-cell" },
];
