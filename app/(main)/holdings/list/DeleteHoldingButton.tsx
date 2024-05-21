'use client'

import { Spinner } from '@/app/_components';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { TrashIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Holding } from '@prisma/client';

const DeleteHoldingButton = () => {

	const router = useRouter();
	const [ error, setError ] = useState(false);
	const [ isDeleteing, setIsDeleteing ] = useState(false);


	const deleteHolding = async ({ holding }: { holding: Holding }) => {
		
	}

	return (
		<Button color='red' disabled={isDeleteing} variant='ghost'>
			<TrashIcon />
			Delete Holding
			{isDeleteing && <Spinner />}
		</Button>
	)
}

export default DeleteHoldingButton