import { Container, Text, Flex } from '@radix-ui/themes'
import React, { ReactNode } from 'react'

interface Props {
	children: ReactNode;
	withBackground?: boolean;
}

const NoDataMessage = ({ children, withBackground }: Props) => {
	if(withBackground){
		return (
			<Container>
				<Flex className='bg-gray-50 rounded-xl' p="4" gap="4" justify="center">
					<Text color="gray" align="center" as="div">
						{ children }
					</Text>
				</Flex>
			</Container>
		)
	}
	return (
		<Container>
			<Text color="gray" align="center" as="div">
				{ children }
			</Text>
		</Container>
	)
}

export default NoDataMessage