import React from 'react'
import Login from './Login'

interface Props {
	searchParams: { error: string }
}
const SignInPage = ({ searchParams }: Props) => {
	return (
		<Login credentialsError={!!searchParams.error}/>
	)
}

export default SignInPage