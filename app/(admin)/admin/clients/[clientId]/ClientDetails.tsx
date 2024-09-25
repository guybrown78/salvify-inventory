import { ClientWithUserItems } from '@/app/_types/clientTypes'
import { Flex, Heading, Text } from '@radix-ui/themes'
import React from 'react'
import LabelValueColumn from '@/app/_components/LabelValueColumn'

const ClientDetails = ({ client }:{ client:ClientWithUserItems }) => {
	return (
		<>
			<Heading>{client.name}</Heading>
			<Flex gap="3" my="2" align="center">
				<LabelValueColumn label='Users'>
					<Text>{client.users.length}</Text>
				</LabelValueColumn>
				<LabelValueColumn label='Items'>
					<Text>{client.items.length}</Text>
				</LabelValueColumn>
			</Flex>
		</>
	)
}

export default ClientDetails