'use client'

import { Dialog } from '@radix-ui/themes'
import { Cross2Icon } from '@radix-ui/react-icons';
import React, { useState } from 'react'
import { InstancesWithLocation } from '@/app/_types/types';
import { Item } from '@prisma/client';
import RemoveInstanceForm from './RemoveInstanceForm';
import toast, { Toaster } from 'react-hot-toast'
import { useHoldingContext } from '@/app/_providers/HoldingProvider';
import { useRouter } from 'next/navigation';

interface Props{
	instance:InstancesWithLocation,
	item:Item
}
const RemoveInstanceDialog = ({ instance, item }:Props) => {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const {currentHolding} = useHoldingContext()

	if(!currentHolding){
		return null
	}
	return (
		<>
			<Dialog.Root open={open} onOpenChange={setOpen}>
				<Dialog.Trigger>
					<button>Deduct from stock</button>
				</Dialog.Trigger>
				<Dialog.Content className="relative">
					<Dialog.Title>{item.title}</Dialog.Title>
		
					<Dialog.Description as='div'>
						<RemoveInstanceForm 
							onFormComplete={() => {
								toast.success(`Items have been removed`)
								setOpen(false);
								router.refresh();
							}}
							instance={instance}
							itemId={item.id}
							holdingId={currentHolding.id}
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

	)
}

export default RemoveInstanceDialog