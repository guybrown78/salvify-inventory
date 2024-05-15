'use client'

import { Spinner } from '@/app/_components';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


const DeleteOrderButton = ({ orderId }: { orderId: number }) => {

	const router = useRouter();
	const [ error, setError ] = useState(false);
	const [ isDeleteing, setIsDeleteing ] = useState(false);

	const deleteOrder = async () => {
		try{
			setIsDeleteing(true)
			await axios.delete(`/api/orders/${orderId}`)
			router.push('/orders/list');
			router.refresh();
		} catch (error) {
			setIsDeleteing(false);
			setError(true);
		}
	}

	return (
		<>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button color='red' disabled={isDeleteing}>
						Delete Order
						{isDeleteing && <Spinner />}
					</Button>
				</AlertDialog.Trigger>
				<AlertDialog.Content>
					<AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
					<AlertDialog.Description>Are you sure you want to delete this order? This action cannot be undone.</AlertDialog.Description>
					<Flex className='mt-4' gap="3">
						<AlertDialog.Cancel>
							<Button color="gray" variant='soft'>Cancel</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action>
							<Button color="red" onClick={deleteOrder}>Delete Order</Button>
						</AlertDialog.Action>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>

			<AlertDialog.Root open={error}>
				<AlertDialog.Content>
					<AlertDialog.Title>Error</AlertDialog.Title>
					<AlertDialog.Description>This order could not be deleted</AlertDialog.Description>
					<Button mt="4" color="gray" variant='soft' onClick={() => { setError(false) }}>OK</Button>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</>
	
	)
}

export default DeleteOrderButton