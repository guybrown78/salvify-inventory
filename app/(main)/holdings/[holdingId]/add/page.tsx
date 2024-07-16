
import { NoDataMessage } from '@/app/_components';
import prisma from '@/prisma/client';
import { Box, Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import { HoldingPageProps, fetchHolding } from '../holdingQuery';
import InstanceItems from './InstanceItems';

const HoldingsAddItemsPage= async ({ params }: HoldingPageProps) => {
	const holding = await fetchHolding(parseInt(params.holdingId))

	if(!holding)
		notFound();

	if(!holding.canAddIncidents){
		return(
			<NoDataMessage>
				<p>Sorry, you can&apos;t add instances in this holding.</p> 
				<p>To add instances into the holding you need to allow &apos;add instances&apos; toggle in the holding admin</p>
			</NoDataMessage>	
	)}

	// get items in the client
	const items = await prisma.item.findMany({
		where: { clientId: holding.clientId }, 
	});

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