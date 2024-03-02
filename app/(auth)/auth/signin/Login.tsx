"use client"

import { FieldErrorMessage, Spinner } from '@/app/_components';
import { Button, Callout, TextField } from '@radix-ui/themes';
import React, { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signIn } from 'next-auth/react';

interface Props {
	credentialsError?: boolean
}


const loginSchema = z.object({
	email: z
		.string()
		.min(1, "Enter a your email address.")
		.email("This is not a valid email."),
	password: z
		.string()
		.min(8, 'Password should be at least 8 characters.')
		.max(65535)
});

type LoginFormData = z.infer<typeof loginSchema>

const Login = ({ credentialsError }: Props) => {
	console.log("credentialsError",credentialsError)
	const { register, control, handleSubmit, formState: {errors} } = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema)
	});
	const [error, setError] = useState(credentialsError ? "Signin failed." : "");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = handleSubmit(async (data) => {
		try{
			setIsSubmitting(true);
			await signIn("credentials", {
				...data,
				redirect: true,
				callbackUrl: '/'
			})
		} catch (error) {		
			setIsSubmitting(false);
			console.log(error)
			setError('An unexpected error occured')
		}
	});

	return (
		<div className='max-w-lg mx-auto'>
			{error && <Callout.Root color="red" className='mb-5'>
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>}
			<form 
				className='space-y-3' 
				onSubmit={onSubmit}>
				<TextField.Root>
					<TextField.Input placeholder='Email' {...register('email')} />
				</TextField.Root>
				<FieldErrorMessage>{errors.email?.message}</FieldErrorMessage>
				<TextField.Root>
					<TextField.Input type="password" placeholder='Password' {...register('password')} />
				</TextField.Root>
				<FieldErrorMessage>{errors.password?.message}</FieldErrorMessage>
				<Button disabled={isSubmitting}>
					{ !isSubmitting ? 'Sign in' : 'Signing in' }{' '}
					{isSubmitting && <Spinner />}
				</Button>
			</form>
		</div>
	)
}

export default Login