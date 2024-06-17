"use client";

import { Spinner } from "@/app/_components";
import { HoldingWithLocations } from "@/app/_types/types";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
	holding: HoldingWithLocations;
}

const DeleteHoldingButton = ({ holding }: Props) => {
	const router = useRouter();
	const [error, setError] = useState(false);
	const [isDeleteing, setIsDeleteing] = useState(false);

	const deleteHolding = async () => {
		try {
			setIsDeleteing(true);
			await axios.delete(`/api/holdings/${holding.id}`);
			setIsDeleteing(false);
			router.push("/holdings/list");
			router.refresh();
		} catch (error) {
			setIsDeleteing(false);
			setError(true);
		}
	};

	if (!holding) {
		return null;
	}

	if (holding?.locations?.length > 0) {
		return (
			<Button color="red" disabled variant="ghost">
				<TrashIcon />
				Delete Holding
			</Button>
		);
	}
	return (
		<>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button color="red" disabled={isDeleteing} variant="ghost">
						<TrashIcon />
						Delete Holding
						{isDeleteing && <Spinner />}
					</Button>
				</AlertDialog.Trigger>
				<AlertDialog.Content>
					<AlertDialog.Title>Delete {holding?.title}?</AlertDialog.Title>
					<AlertDialog.Description>
						Are you sure you want to delete this holding and all it&apos;s
						content? This action cannot be undone.
					</AlertDialog.Description>
					<Flex className="mt-4" gap="3">
						<AlertDialog.Cancel>
							<Button color="gray" variant="soft">
								Cancel
							</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action>
							<Button color="red" onClick={deleteHolding}>
								Delete Holding
							</Button>
						</AlertDialog.Action>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>

			<AlertDialog.Root open={error}>
				<AlertDialog.Content>
					<AlertDialog.Title>Error</AlertDialog.Title>
					<AlertDialog.Description>
						This holding could not be deleted
					</AlertDialog.Description>
					<Button
						mt="4"
						color="gray"
						variant="soft"
						onClick={() => {
							setError(false);
						}}
					>
						OK
					</Button>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</>
	);
};

export default DeleteHoldingButton;
