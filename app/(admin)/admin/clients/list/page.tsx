import React from 'react'
import AdminMain from '@/app/_components/layout/AdminMain'
import prisma from '@/prisma/client'

import { Flex } from '@radix-ui/themes';
import ClientTable from './ClientTable';
import ClientToolbar from './ClientToolbar';
import { NoDataMessage } from '@/app/_components';

const ClientListPage = async () => {

	const clients = await prisma.client?.findMany({
		include: {
      users: true, // Fetch number of associated users
      items: true, // Fetch number of associated items
    },
	})

	if (!clients || !clients.length)
		return (
			<AdminMain>
				<Flex direction="column" gap="3">
					<ClientToolbar />
					<NoDataMessage>There are no clients in the system</NoDataMessage>
				</Flex>
			</AdminMain>
		);

	return (
		<AdminMain>
			<Flex direction="column" gap="3">
				<ClientToolbar />
				<ClientTable clients={clients} />
			</Flex>
		</AdminMain>
	)
}

export default ClientListPage