import React from 'react'
import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes';
import { NoDataMessage } from '@/app/_components';
import { getSessionUser } from '@/app/_utils/getSessionUser';
import { ItemWithInstancesHoldingItems } from '@/app/_types/types';
import prisma from '@/prisma/client';
import ItemHolding from './ItemHolding';

interface Props {
	item:ItemWithInstancesHoldingItems
}


const ItemHoldings = async ({ item }:Props) => {

	const sessionUser = await getSessionUser();
	const holdings = await prisma.holding.findMany({
		where:{
			clientId: sessionUser!.clientId!
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
						There are currently no holdings for { sessionUser!.clientName! }.
					</NoDataMessage>
				</Flex>
			</Flex>
		)
	}
	
	return (
		<Flex direction="column" gap="5">
			<Heading as="h3" size="3" >Holdings</Heading>
			<Flex gap="4" direction="column">
				<Flex className='bg-green-50 rounded-xl' p="3">
					<Text color='green' size="2">Here you can include the Item ({item.title}) within a holding. Once the Item is attached to a holding it makes the item a must have within the holding. Setting a minimum stock count add extra checks to ensure there enough Instances of {item.title} available in the holding.</Text>
				</Flex>
				<ul className='w-full'>
					{
						holdings.map(holding => (
							<li key={holding.id} className='mb-5'>
								<ItemHolding 
									holding={holding} 
									item={item}
								/>
							</li>
						))
					}
				</ul>
			</Flex>
		</Flex>
	)
}

export default ItemHoldings