import React from 'react'
import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes';
import { NoDataMessage } from '@/app/_components';
import { getSessionUser } from '@/app/_utils/getSessionUser';
import { ItemWithInstances } from '@/app/_types/types';
import prisma from '@/prisma/client';

interface Props {
	item:ItemWithInstances
}


const ItemHoldings = async ({ item }:Props) => {

	const sessionUser = await getSessionUser();
	const holdings = await prisma.holding.findMany({
		where:{
			clientId: sessionUser!.clientId!
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
			<Flex gap="4">
				{/*  */}
			</Flex>
		</Flex>
	)
}

export default ItemHoldings