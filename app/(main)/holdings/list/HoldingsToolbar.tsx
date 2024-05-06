import { Button, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const HoldingsToolbar = () => {
	return (
		<Flex justify="between" align="center">
			<Text>All Holdings</Text>
			<Button>
				<Link href="/holdings/new">New Holding</Link>
			</Button>

		</Flex>
	)
}

export default HoldingsToolbar