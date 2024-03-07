'use client'

import { Spinner } from '@/app/_components';
import { Location } from '@prisma/client';
import { TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, IconButton, Button, Flex } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface Props{
	location: Location
	holdingId: number
}
const DeletLocationButton = ({ location, holdingId }: Props) => {

	const router = useRouter();
	const [ error, setError ] = useState(false);
	const [ isDeleting, setIsDeleting ] = useState(false);

	const deleteLocation = async () => {
		setIsDeleting(true)
		console.log(location.id, holdingId)
		setTimeout(() => {
			setIsDeleting(false);
			setError(true);
		}, 1500)
	}

	return (
		<>
		
		<AlertDialog.Root>
				<AlertDialog.Trigger>
					<IconButton disabled={isDeleting} color="crimson" variant="soft">
						{isDeleting && <Spinner />}
						{!isDeleting && <TrashIcon width="18" height="18" />}
					</IconButton>
				</AlertDialog.Trigger>
				<AlertDialog.Content>
					<AlertDialog.Title>Confirm Deletion of { location.title }</AlertDialog.Title>
					<AlertDialog.Description>Are you sure you want to delete this location? This action cannot be undone.</AlertDialog.Description>
					<Flex className='mt-4' gap="3">
						<AlertDialog.Cancel>
							<Button color="gray" variant='soft'>Cancel</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action>
							<Button color="red" onClick={deleteLocation}>Delete Location</Button>
						</AlertDialog.Action>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>

			<AlertDialog.Root open={error}>
				<AlertDialog.Content>
					<AlertDialog.Title>Error</AlertDialog.Title>
					<AlertDialog.Description>{ location.title } could not be deleted.</AlertDialog.Description>
					<Button mt="4" color="gray" variant='soft' onClick={() => { setError(false) }}>OK</Button>
				</AlertDialog.Content>
			</AlertDialog.Root>

		</>
		
	)
}

export default DeletLocationButton