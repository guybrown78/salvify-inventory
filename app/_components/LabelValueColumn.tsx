import { Flex, Text } from '@radix-ui/themes'
import { ReactNode } from 'react'

interface Props {
	label:string
	children:ReactNode
}

const LabelValueColumn = ({ label, children }: Props) => {
	
	return (
		<Flex direction="column">
			<Text size="1">{label}</Text>
			<Text as="div" size="2">
				{children}
			</Text>
		</Flex>
	)
}

export default LabelValueColumn