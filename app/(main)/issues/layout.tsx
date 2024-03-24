import Main from '@/app/_components/layout/Main'
import React, { PropsWithChildren } from 'react'

const IssueLayout = ({ children }:PropsWithChildren) => {
	return (
		<Main>{children}</Main>
	)
}

export default IssueLayout