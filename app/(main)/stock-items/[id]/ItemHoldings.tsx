import React from 'react'
import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes';
import { NoDataMessage } from '@/app/_components';
import { ItemWithInstancesHoldingItems } from '@/app/_types/types';
import prisma from '@/prisma/client';
import ItemHolding from './ItemHolding';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';

interface Props {
	item:ItemWithInstancesHoldingItems
}


const ItemHoldings = async ({ item }:Props) => {

	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		return null;
	}


	const holdings = await prisma.holding.findMany({
		where:{
			clientId: session.user.clientId!
		},
		include:{
			locations: true
		}
	});

	if(!holdings.length){
		return (
			<Flex direction="column" gap="5">
				<Heading as="h3" size="3" >Holdings</Heading>
				<Flex gap="4">
					<NoDataMessage>
						There are currently no holdings for { session.user.clientName! }.
					</NoDataMessage>
				</Flex>
			</Flex>
		)
	}
	
	return (
		<Flex direction="column" gap="5">
			<Heading as="h3" size="3" >Holdings</Heading>
			<Flex gap="4" direction="column">
				<Flex className='bg-yellow-50 rounded-xl' p="3">
					<Text color='yellow' size="2">Here you can include the Item ({item.title}) within a holding. Once the Item is attached to a holding it makes the item a must have within the holding. Setting a minimum stock count add extra checks to ensure there enough Instances of {item.title} available in the holding.</Text>
				</Flex>
				<ul className='w-full'>
					{
						holdings.map(holding => {
							const locationIds = holding.locations.map(location => location.id);
							const holdingInstances = item.instances ? item.instances.filter(
									(instance) => locationIds.includes(instance.locationId)
							) : [];
							return (
								<li key={holding.id} className='mb-5'>
									<ItemHolding 
										holding={holding} 
										item={item}
										holdingInstances={holdingInstances}
									/>
								</li>
						)})
					}
				</ul>
			</Flex>
		</Flex>
	)
}

export default ItemHoldings