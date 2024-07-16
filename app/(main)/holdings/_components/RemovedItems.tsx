import { RemoveInstanceWithItemLocationUser } from "@/app/_types/types";
import RemovedItemsService from "@/app/_utils/RemovedItemsService";
import { Flex } from "@radix-ui/themes";
import RemovedItemsTable from "./RemovedItemsTable";
import RemovedItemsToolbar from "./RemovedItemsToolbar";

interface Props {
	clientId: number;
	holdingId: number;
	offset: number;
}

const RemovedItems = async ({ clientId, holdingId, offset = 30 }: Props) => {
	const removedInstances = await RemovedItemsService.getHoldingRemovedItems(
		holdingId,
		offset
	);

	if (!removedInstances) {
		return null;
	}

	return (
		<Flex direction="column" gap="3">
			<RemovedItemsToolbar
				removedInstancesCount={removedInstances.length ?? 0}
			/>
			<RemovedItemsTable
				removedInstances={
					removedInstances as RemoveInstanceWithItemLocationUser[]
				}
			/>
		</Flex>
	);
};

export default RemovedItems;
