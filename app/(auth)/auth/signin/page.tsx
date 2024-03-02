import React from 'react'
import Login from './Login'

interface Props {
	searchParams: { error: string }
}
const SignInPage = ({ searchParams }: Props) => {
	return (
		<div>
			<Login credentialsError={!!searchParams.error}/>
		</div>
	)
}

export default SignInPage