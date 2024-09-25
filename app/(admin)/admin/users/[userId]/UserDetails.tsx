import LabelValueColumn from '@/app/_components/LabelValueColumn'
import { UserWithClients } from '@/app/_types/userTypes'
import { User } from '@prisma/client'
import { Flex, Heading, Text, Card } from '@radix-ui/themes'
import React from 'react'
import UserOptionalClients from './UserOptionalClients'

const UserDetails = ({ user }:{ user:UserWithClients}) => {
	return (
		<>
			<Heading>{user.name}</Heading>
			<Flex gap="3" my="2" align="center">
				<LabelValueColumn label='Role'>
					<Text>{user.role}</Text>
				</LabelValueColumn>
				<LabelValueColumn label='Email'>
					<Text size="3">{user.email}</Text>
				</LabelValueColumn>
				
			</Flex>
			<Card className='max-w-full' mt="4">
				<Flex gap="3">
					<LabelValueColumn label='Selected Client ID:'>
						<Text size="4">{user.clientId}</Text>
					</LabelValueColumn>
					<LabelValueColumn label='Selected Client Name:'>
						<Text size="4">{user.selectedClient.name}</Text>
					</LabelValueColumn>
				</Flex>
				<UserOptionalClients user={user} />
			</Card>
		</>
	)
}

export default UserDetails