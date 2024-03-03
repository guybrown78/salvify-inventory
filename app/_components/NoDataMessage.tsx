import { Container, Text } from '@radix-ui/themes'
import React, { PropsWithChildren } from 'react'

const NoDataMessage = ({ children }: PropsWithChildren) => {
	return (
		<Container>
			<Text color="gray" align="center" as="div">
				{ children }
			</Text>
		</Container>
	)
}

export default NoDataMessage