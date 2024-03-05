import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const HoldingsToolbar = () => {
	return (
		<Flex justify="between">
			<div>_</div>
			<Button>
				<Link href="/holdings/new">New Holding</Link>
			</Button>

		</Flex>
	)
}

export default HoldingsToolbar