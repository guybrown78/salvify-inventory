import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const StockToolbar = () => {
	return (
		<Flex justify="between">
			<div>_</div>
			<Button>
				<Link href="/stock-items/new">New Stock Item</Link>
			</Button>

		</Flex>
	)
}

export default StockToolbar