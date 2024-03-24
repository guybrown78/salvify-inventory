import InstanceExpiryDate from '@/app/_components/InstanceExpiryDate';
import { ItemWithInstances } from '@/app/_types/types';
import prisma from '@/prisma/client';
import { Item } from '@prisma/client';
import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes';
import React, { ReactNode } from 'react'

interface Props {
	item:ItemWithInstances
	holdingId:number
}
const StockOverview = async ({ item, holdingId }:Props) => {

	const where = {
		itemId: item.id,
		location: {
			holdingId: holdingId,
		},
	}

	const earliestExpiryDateInstance = await prisma.instance.findFirst({
		where,
		orderBy: {
			expiryDate: 'asc',
		},
	});


	const earliestExpiryDate = earliestExpiryDateInstance ? String(earliestExpiryDateInstance.expiryDate) : null;

	const latestExpiryDateInstance = await prisma.instance.findFirst({
		where,
		orderBy: {
			expiryDate: 'desc',
		},
	});
	
	const latestExpiryDate = latestExpiryDateInstance ? String(latestExpiryDateInstance.expiryDate) : null;

	const instanceLocations = await prisma.instance.findMany({
		where,
		distinct: ['locationId'],
	});
	
	const locationsCount = instanceLocations.length;

	const totalQuantity = item.instances ? item.instances.reduce((total, instance) => total + instance.quantity, 0) : '';

	const containers:{
		label: string;
		value: string | ReactNode;
	}[] = [
		{ label: 'Required Stock', value: String(item.requiredCount)},
		{ label: 'Total Stock', value: String(totalQuantity) },
		{ label: 'Location Count', value: String(locationsCount) },
		{ label: 'Nearest expiry date', value: <InstanceExpiryDate 
			expiryDate={earliestExpiryDate} 
			showCountdown 
		/>},
		{ label: 'Furthest expiry date', value: <InstanceExpiryDate 
			expiryDate={latestExpiryDate} 
			showCountdown 
		/>},
	];

	return (
		<Flex direction="column" gap="5">
			<Heading as="h3" size="3" >Overview</Heading>
			<Flex gap="4">
				{containers.map(container => (
					<Card key={container.label}>
						<Flex direction="column" gap="1">
							<Text size="2">{container.label}</Text>
							<Text size="5" className='font-bold'>{container.value}</Text>
						</Flex>
					</Card>
				))}
			</Flex>
		</Flex>
	)
}

export default StockOverview