
import { notFound } from 'next/navigation';
import HoldingHeader from '../HoldingHeader';
import { HoldingPageProps, fetchHolding } from '../holdingQuery';
import { NoDataMessage } from '@/app/_components';
import { Heading, Text, Box, Flex } from '@radix-ui/themes';
import AddInstanceForm from './AddInstanceForm';
import prisma from '@/prisma/client'
import InstanceItems from './InstanceItems';

const HoldingsAddItemsPage= async ({ params }: HoldingPageProps) => {
	const holding = await fetchHolding(parseInt(params.holdingId))

	if(!holding)
		notFound();

	if(holding.type !== "STORE"){
		return(
			<NoDataMessage>
				<p>Sorry, you can&apos;t add instances in this holding. To add instances into the sytem, please go through your main holding</p>
			</NoDataMessage>	
	)}

	const items = await prisma.item.findMany();

	return (
		
			<Flex direction="column" gap="3">
				<Box className="max-w-xl">
					<Heading mb="3">Add items instances</Heading>
					<Text>Here you can select items that are in the stock list. Once you find an item you can add new instances.</Text>
				</Box>
				
				<InstanceItems 
					holdingId={parseInt(params.holdingId)}
					items={items} 
					locations={holding.locations} 
				/>
			</Flex>
			
	)
}

export default HoldingsAddItemsPage