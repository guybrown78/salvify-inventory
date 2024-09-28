
import { UserWithClients } from '@/app/_types/userTypes'
import { Flex, Heading, Text } from '@radix-ui/themes'
import LabelValueColumn from '@/app/_components/LabelValueColumn'
import UserOptionalClientsForm from './UserOptionalClientsForm'
import prisma from '@/prisma/client'
// 


const UserOptionalClients = async ({ user }:{ user:UserWithClients}) => {


	const clients = await prisma.client?.findMany();

	return (
		<>
			<Flex mt="3" direction="column" gap="2">
				<Heading size="3">
					Optional Clients ({user.optionalClients?.length | 0})
				</Heading>
				<UserOptionalClientsForm 
					clients={clients || []} 
					userOptionalClients={user.optionalClients || []}
					userId={user.id}
				/>
			</Flex>

			<div className="flex justify-between border-t border-slate-200 my-3" />

			
		</>

	)
}

export default UserOptionalClients