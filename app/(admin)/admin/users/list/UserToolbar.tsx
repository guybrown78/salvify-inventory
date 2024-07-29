
import React from 'react'
import { Button, Flex, Heading } from '@radix-ui/themes'
import Link from 'next/link'


const UserToolbar = () => {
	return (
		<Flex justify='between'>
		<Heading>Users</Heading>
		<Button>
			<Link href="/admin/users/new">New User</Link>
		</Button>
	</Flex>
	)
}
export default UserToolbar