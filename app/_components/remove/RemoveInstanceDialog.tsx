'use client'
import { Dialog } from '@radix-ui/themes'
import { Cross2Icon } from '@radix-ui/react-icons';
import React, { useState } from 'react'
import { InstancesWithLocation } from '@/app/_types/types';
import { Item } from '@prisma/client';
import RemoveInstanceForm from './RemoveInstanceForm';

interface Props{
	instance:InstancesWithLocation,
	item:Item
}
const RemoveInstanceDialog = ({ instance, item }:Props) => {

	const [open, setOpen] = useState(false);

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger>
				<button>Deduct from stock</button>
			</Dialog.Trigger>
			<Dialog.Content className="relative">
				<Dialog.Title>{item.title}</Dialog.Title>
	
				<Dialog.Description>
					<RemoveInstanceForm 
						onFormComplete={() => setOpen(false)}
						instance={instance}
						item={item}
					/>
				</Dialog.Description>

				<Dialog.Close>
					<button className="absolute top-4  right-4" aria-label="Close">
						<Cross2Icon />
					</button>
				</Dialog.Close>
			</Dialog.Content>
		</Dialog.Root>
	)
}

export default RemoveInstanceDialog