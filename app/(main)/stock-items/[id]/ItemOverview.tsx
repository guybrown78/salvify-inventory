import React, { ReactNode } from 'react'
import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes';
import { NoDataMessage } from '@/app/_components';
import { ItemWithInstances } from '@/app/_types/types';
import InstanceExpiryDate from '@/app/_components/InstanceExpiryDate';

interface Props {
	item:ItemWithInstances
}

const ItemOverview = ({ item }:Props) => {


	const containers:{
		label: string;
		value: string | ReactNode;
	}[] = [
		{ label: 'Required Stock', value: ""},
		{ label: 'Total Stock', value: "" },
		{ label: 'Holding Count', value: "" },
		{ label: 'Nearest expiry date', value: ""},
		{ label: 'Furthest expiry date', value: ""},
	];

	// if(!item.instances || !item.instances.length){
	// 	return (
	// 		<Flex direction="column" gap="5">
	// 			<Heading as="h3" size="3" >Overview</Heading>
	// 			<Flex gap="4">
	// 				<NoDataMessage>There are currently no instances for this Item.</NoDataMessage>
	// 			</Flex>
	// 		</Flex>
	// 	)
	// }
	const color = "gray";//!item.instances || !item.instances.length ? "gray-400" : "gray"
	return (
		<Flex direction="column" gap="5">
			<Heading as="h3" size="3" >Overview</Heading>
			<Flex gap="4">
				{containers.map(container => (
					<Card key={container.label}>
						<Flex direction="column" gap="1">
							<Text size="2" color={color}>{container.label}</Text>
							<Text size="5" className='font-bold' color={color}>{container.value}</Text>
						</Flex>
					</Card>
				))}
			</Flex>
		</Flex>
	)
}

export default ItemOverview