"use client";

import { useHoldingContext } from "@/app/_providers/HoldingProvider";
import { InstancesWithLocation } from "@/app/_types/types";
import { Item } from "@prisma/client";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button, Dialog } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import RemoveInstanceForm from "./RemoveInstanceForm";
import { RemoveInstanceReason } from '@prisma/client';

interface Props {
	instance: InstancesWithLocation;
	item: Item;
	holdingId?: number;
	defaultReason?:RemoveInstanceReason
	defaultQuantity?:number
}
const RemoveInstanceDialog = ({ instance, item, holdingId,defaultReason, defaultQuantity }: Props) => {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const { currentHolding } = useHoldingContext();

	if (!holdingId && !currentHolding) {
		return null;
	}

	const selectedHoldingId:number = holdingId || currentHolding?.id || 0;
	if(!selectedHoldingId){
		return null;
	}

	return (
		<>
			<Dialog.Root open={open} onOpenChange={setOpen}>
				<Dialog.Trigger>
					<Button disabled={instance.quantity <= 0}>Deduct from stock</Button>
				</Dialog.Trigger>
				<Dialog.Content className="relative">
					<Dialog.Title>{item.title}</Dialog.Title>

					<Dialog.Description as="div">
						<RemoveInstanceForm
							onFormComplete={() => {
								toast.success(`Items have been removed`, {
									id: "removeStockToast",
									duration: 3500,
									position: "bottom-right",
								});
								setOpen(false);
								router.refresh();
							}}
							instance={instance}
							itemId={item.id}
							holdingId={selectedHoldingId}
							defaultReason={defaultReason}
							defaultQuantity={defaultQuantity}
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

export default RemoveInstanceDialog;
