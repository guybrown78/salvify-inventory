import React from 'react'
import { UserWithClients } from '@/app/_types/userTypes'
import { Flex, Heading, Text } from '@radix-ui/themes'
import LabelValueColumn from '@/app/_components/LabelValueColumn'


const UserOptionalClients = ({ user }:{ user:UserWithClients}) => {
	return (
		<>
			<Flex mt="3" direction="column" gap="2">
				<Heading size="3">
					Optional Clients ({user.optionalClients?.length | 0})
				</Heading>
				<ul>
					{user.optionalClients?.map(client => (
						<li key={client.id}>
							<Flex gap="3">
								<LabelValueColumn label='Client ID:'>
									<Text size="3">{client.id}</Text>
								</LabelValueColumn>
								<LabelValueColumn label='Client Name:'>
									<Text size="3">{client.name}</Text>
								</LabelValueColumn>
							</Flex>
						</li>
					))}
				</ul>
			</Flex>

			<div className="flex justify-between border-t border-slate-200 my-3" />

			
		</>

	)
}

export default UserOptionalClients