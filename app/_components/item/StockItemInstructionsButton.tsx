'use client'

import { InfoCircledIcon } from '@radix-ui/react-icons';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';

interface Props {
	title: string
	instructionsURL: string | null
}
const StockItemInstructionsButton = ({ instructionsURL, title }:Props) => {
	if(!instructionsURL || instructionsURL === "" || instructionsURL === " "){
		return null
	}
	return (
		<Button size="1" asChild={true}>
			<a href={instructionsURL} target='_blank'>Show Item Instructions</a>
		</Button>
	)
}

export default StockItemInstructionsButton