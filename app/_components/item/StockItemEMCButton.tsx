'use client'

import { InfoCircledIcon } from '@radix-ui/react-icons';
import { AlertDialog, Button, Flex, Text } from '@radix-ui/themes';

interface Props {
	title: string
	emcId: string | null
}
const StockItemEMCButton = ({ emcId, title }:Props) => {
	if(!emcId || emcId === "" || emcId === " "){
		return null
	}
	return (
		<AlertDialog.Root>
		<AlertDialog.Trigger>
			<Button size="1">
				Show EMC PIL
			</Button>
		</AlertDialog.Trigger>
		<AlertDialog.Content>
			<AlertDialog.Title>
				{title} EMC PIL 
			</AlertDialog.Title>
			<AlertDialog.Description>
				
				<Flex direction="column">
					<div className="relative w-full h-full min-h-96">
						<iframe 
							className='inset-0 w-full h-full min-h-96'
							src={`https://www.medicines.org.uk/emc/files/pil.${emcId}.pdf`} 
						/>
					</div>
					<Flex color='gray' direction="column" className='rounded-xl' p="3" 	my="3" gap="3">
						<Text size="1" color="gray">
							Electronic Medicines Compendium (EMC). Up to date, approved and regulated prescribing and patient information for licensed medicines.
						</Text>
						<Text size="2" color="gray">
							The PDF above shows the Patient Leaflet (PIL). To see this on the emc website visit <a className="underline text-green-600" href={`https://www.medicines.org.uk/emc/files/pil.${emcId}.pdf`} target="_blank">https://www.medicines.org.uk/emc/files/pil.{emcId}.pdf</a>
						</Text>
						<Text size="2" color="gray">
							Further information for {title} can be found on <a className="underline text-green-600" href={`https://www.medicines.org.uk/emc/product/${emcId}/smpc`} target="_blank">Healthcar professionals (SmPC)</a>
						</Text>
					</Flex>
				</Flex>
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

export default StockItemEMCButton