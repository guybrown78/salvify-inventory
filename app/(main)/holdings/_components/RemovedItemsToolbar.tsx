import { Button, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const RemovedItemsToolbar = () => {
	return (
		<Flex justify="between" align="center">
			<Text>Removed Items</Text>
		</Flex>
	)
}

export default RemovedItemsToolbar