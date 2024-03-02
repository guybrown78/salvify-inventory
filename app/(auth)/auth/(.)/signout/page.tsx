'use client'

import { AlertDialog, Button } from '@radix-ui/themes'
import React from 'react'

const SignoutPage = () => {
	return (
		<AlertDialog.Root open={true}>
				<AlertDialog.Content>
					<AlertDialog.Title>Log out</AlertDialog.Title>
					<AlertDialog.Description>Are you sure you want to Sign out?</AlertDialog.Description>
					<Button mt="4" color="gray" variant='soft' onClick={() => console.log('click')}>OK</Button>
				</AlertDialog.Content>
		</AlertDialog.Root>
	)
}

export default SignoutPage