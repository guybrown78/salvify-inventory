"use client";

import { useHoldingContext } from "@/app/_providers/HoldingProvider";
import {
	HoldingWithLocations,
	InstancesWithLocation,
} from "@/app/_types/types";
import { Item } from "@prisma/client";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button, Dialog } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SwapInstanceForm from "./SwapInstanceForm";

interface Props {
	instance: InstancesWithLocation;
	item: Item;
}

const SwapInstanceDialog = ({ instance, item }: Props) => {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const { currentHolding } = useHoldingContext();
	// Type assertion
	const currentHoldingWithLocations = currentHolding as HoldingWithLocations;

	if (!currentHolding) {
		return null;
	}

	return (
		<>
			<Dialog.Root open={open} onOpenChange={setOpen}>
				<Dialog.Trigger>
					<Button disabled={instance.quantity <= 0}>Swap</Button>
				</Dialog.Trigger>
				<Dialog.Content className="relative">
					<Dialog.Title>{item.title}</Dialog.Title>

					<Dialog.Description as="div">
						<SwapInstanceForm
							onFormComplete={() => {
								toast.success(`Items have been swaped`, {
									id: "swapInstanceToast",
									duration: 3500,
									position: "bottom-right",
								});
								setOpen(false);
								router.refresh();
							}}
							instance={instance}
							item={item}
							currentHolding={currentHoldingWithLocations}
						/>
					</Dialog.Description>

					<Dialog.Close>
						<button className="absolute top-4  right-4" aria-label="Close">
							<Cross2Icon />
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Root>

			<Toaster />
		</>
	);
};

export default SwapInstanceDialog;
