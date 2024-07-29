import React from 'react'
import AdminMain from '@/app/_components/layout/AdminMain'
import prisma from '@/prisma/client'

import { Flex } from '@radix-ui/themes';
import UserTable from './UserTable';
import UserToolbar from './UserToolbar';
import { NoDataMessage } from '@/app/_components';


const AdminUsersPage = async () => {

	const users = await prisma.user?.findMany({})

	if (!users || !users.length)
		return (
			<AdminMain>
				<Flex direction="column" gap="3">
					<UserToolbar />
					<NoDataMessage>There are no users in the system</NoDataMessage>
				</Flex>
			</AdminMain>
		);


	return (
		<AdminMain>
			<Flex direction="column" gap="3">
				<UserToolbar />
				<UserTable users={users} />
			</Flex>
		</AdminMain>
	)
}

export default AdminUsersPage