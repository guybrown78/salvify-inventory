'use client'

import { FieldErrorMessage, Spinner } from '@/app/_components'
import { holdingSchema } from '@/app/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Holding } from '@prisma/client'
import { Button, Callout, TextField } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod';

type HoldingFormData = z.infer<typeof holdingSchema>

interface Props {
	holding?: Holding
}


const HoldingForm = ({ holding }: Props) => {

	const router = useRouter();
	const { register, control, handleSubmit, formState: {errors} } = useForm<HoldingFormData>({ resolver: zodResolver(holdingSchema)})

	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = handleSubmit(async (data) => {
		console.log(data)
		try{
			setIsSubmitting(true);
			if(holding){
				await axios.patch('/api/holdings/' + holding.id, data);
			}else{
				await axios.post('/api/holdings', data)
			}
			router.push('/holdings/list');
			router.refresh();
		} catch (error) {
			setIsSubmitting(false);
			setError('An unexpected error occured');
		}
	})

	return(
		<div className='max-w-xl'>
			{error && <Callout.Root color='red' className='mb-5'>
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>}
			<form 
				className='space-y-3' 
				onSubmit={onSubmit}>
					<TextField.Root>
						<TextField.Input 
							defaultValue={holding?.title} 
							placeholder='Holding Title/Name' 
							{...register('title')}
						/>
					</TextField.Root>
					<FieldErrorMessage>{errors.title?.message}</FieldErrorMessage>

					<TextField.Root>
						<TextField.Input 
							defaultValue={holding?.field || ""} 
							placeholder='Secondary field (optional)' 
							{...register('field')}
						/>
					</TextField.Root>
					<FieldErrorMessage>{errors.field?.message}</FieldErrorMessage>

					<Button disabled={isSubmitting}>
						{ holding ? 'Update Holding' : 'Create New Holding' }{' '}
						{isSubmitting && <Spinner />}
					</Button>
					
			</form>
		</div>
	)
}

export default HoldingForm