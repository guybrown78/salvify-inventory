'use client'

import { InfoCircledIcon } from '@radix-ui/react-icons';
import { AlertDialog, Button, Flex, Box } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';
import * as ScrollArea from "@radix-ui/react-scroll-area";
import './dialog-information-scroll.css';
interface Props {
	title: string
	information: string | null
}

const StockItemInformationButton = ({ information, title }:Props) => {
	// 
	if (!information || information.trim() === "") {
    return null;
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
					<Box className='scrollable-content prose max-w-full'>
						<ReactMarkdown>
							{information}
						</ReactMarkdown>
					</Box>
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