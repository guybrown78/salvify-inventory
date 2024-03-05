import { Holding } from '@prisma/client'
import { Flex, Text, Heading, Button, IconButton } from '@radix-ui/themes'
import React from 'react'

interface Props {
	holding: Holding
}

const HoldingHeader = ({ holding }: Props) => {
	return (
		<div className="bg-slate-50 shadow -mx-3 md:-mx-8 -my-10">
		<div className="px-4 sm:px-6 lg:px-8">
			<Flex justify="between" py="6">
				<Flex direction="column">
					<Heading as='h1' size="5" weight="bold">{ holding.title }</Heading>
					<Text size="2" color="gray">{ holding.field }</Text>
				</Flex>
			</Flex>
	
		</div>
	</div>
	)
}

export default HoldingHeader