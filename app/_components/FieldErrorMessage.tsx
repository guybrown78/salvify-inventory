import { Text } from '@radix-ui/themes'
import React, { PropsWithChildren, ReactNode } from 'react'


const FieldErrorMessage = ({ children }: PropsWithChildren) => {
	if (!children) return null;
	return (
		<Text color='red' as='p'>{children}</Text>
	)
}

export default FieldErrorMessage