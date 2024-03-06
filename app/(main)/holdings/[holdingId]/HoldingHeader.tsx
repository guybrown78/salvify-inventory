import { Holding } from '@prisma/client'
import { Flex, Text, Heading, Button, IconButton } from '@radix-ui/themes'
import React from 'react'
import { HoldingWithLocations } from './holdingQuery'

interface Props {
	holding: HoldingWithLocations
}

const HoldingHeader = ({ holding }: Props) => {
	return (
		<div className="bg-slate-50 shadow -mx-3 md:-mx-8 -my-10">
		<div className="px-4 sm:px-6 lg:px-8">
			<Flex justify="between" py="6">
				<Flex direction="column">
					<Heading as='h1' size="5" weight="bold">
						{ holding.title || "Untitled" }
					</Heading>
					<Text size="2" color="gray">
						{ holding.field || "" }
					</Text>
				</Flex>
			</Flex>
	
		</div>
	</div>
	)
}

export default HoldingHeader