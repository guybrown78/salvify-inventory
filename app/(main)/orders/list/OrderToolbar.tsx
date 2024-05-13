import { Button, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const OrderToolbar = () => {
	return (
		<Flex justify="between" align="center">
			<Text>All Orders</Text>
			<Button>
				<Link href="/orders/new">New Order</Link>
			</Button>

		</Flex>
	)
}

export default OrderToolbar