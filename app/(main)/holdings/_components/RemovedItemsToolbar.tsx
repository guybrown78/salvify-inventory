import { Button, Flex, Text } from '@radix-ui/themes'
import { RemoveInstanceWithItemLocationUser } from "@/app/_types/types";
import Link from 'next/link'
import React from 'react'
import RemovedItemsFilter from './RemovedItemsFilter';

interface Props {
	removedInstancesCount: number;
}

const RemovedItemsToolbar = ({ removedInstancesCount }: Props) => {
	return (
		<Flex justify="between" align="center">
			<Text>Removed Items ({removedInstancesCount})</Text>
			<RemovedItemsFilter />
		</Flex>
	)
}

export default RemovedItemsToolbar