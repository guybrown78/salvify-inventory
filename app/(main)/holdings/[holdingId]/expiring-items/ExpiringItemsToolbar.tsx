import React from 'react'
import { Box, Flex, Heading, Text } from '@radix-ui/themes';
import ExpiringItemsFilter from './ExpiringItemsFilter';


export interface ExpiringItemsQuery {
	offset: string;
	page: string;
}


interface Props {
	expiringItemsCount: number;
	dayOffsetCount: number
}


const ExpiringItemsToolbar = ({ expiringItemsCount, dayOffsetCount }: Props) => {
	return (
		<Flex direction='column'>
			<Flex justify='between' align='center'>
				<Heading mb="3">Expiring Stock Items ({expiringItemsCount} {expiringItemsCount === 1 ? 'item' : 'items'})</Heading>
				<ExpiringItemsFilter />
			</Flex>
			<Box className="max-w-xl">
				<Text>Items here show those stock items that have that have an expiry date running out within {dayOffsetCount} days.</Text>
			</Box>
		</Flex>
	)
}

export default ExpiringItemsToolbar