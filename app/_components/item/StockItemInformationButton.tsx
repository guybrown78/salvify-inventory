'use client'

import { InfoCircledIcon } from '@radix-ui/react-icons';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';

interface Props {
	title: string
	information: string | null
}

const StockItemInformationButton = ({ information, title }:Props) => {
	// 
	if(!information || information === "" || information === " "){
		return (<></>)
	}
	// 
	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger>
				<Button variant='surface'>
					<InfoCircledIcon /> Information
				</Button>
			</AlertDialog.Trigger>
			<AlertDialog.Content>
				<AlertDialog.Title>
					{title}
				</AlertDialog.Title>
				<AlertDialog.Description>
					{information}
				</AlertDialog.Description>
				<Flex className='mt-4' gap="3" justify="end">
					<AlertDialog.Cancel>
						<Button color="gray" variant='soft'>Close</Button>
					</AlertDialog.Cancel>
				</Flex>
			</AlertDialog.Content>
		</AlertDialog.Root>
	)
}

export default StockItemInformationButton