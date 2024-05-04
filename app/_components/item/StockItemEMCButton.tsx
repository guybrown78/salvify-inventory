'use client'

import { InfoCircledIcon } from '@radix-ui/react-icons';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';

interface Props {
	title: string
	emcPilURL: string | null
}
const StockItemEMCButton = ({ emcPilURL, title }:Props) => {
	if(!emcPilURL || emcPilURL === "" || emcPilURL === " "){
		return null
	}
	return (
		<Button size="1">
			Show EMC PIL
		</Button>
	)
}

export default StockItemEMCButton