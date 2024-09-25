import React from 'react'
import { Button, Flex, Heading } from '@radix-ui/themes'
import Link from 'next/link'

const ClientToolbar = () => {
	return (
		<Flex justify='between'>
			<Heading>Clients</Heading>
			<Button>
				<Link href="/admin/clients/new">New Client</Link>
			</Button>
		</Flex>
	)
}

export default ClientToolbar