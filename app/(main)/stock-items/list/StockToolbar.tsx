import { Button, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const StockToolbar = () => {
	return (
		<Flex justify="between" align="center">
			<Text>All Items across all Holdings</Text>
			<Button>
				<Link href="/stock-items/new">New Stock Item</Link>
			</Button>

		</Flex>
	)
}

export default StockToolbar