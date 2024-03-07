'use client'

import { FieldErrorMessage, Spinner } from '@/app/_components'
import { locationSchema } from '@/app/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Holding, Location } from '@prisma/client'
import { Button, Callout, TextField } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod';


type LocationFormData = z.infer<typeof locationSchema>

interface Props {
	holdingId: number
	location?: Location
}



const LocationForm = ({ holdingId, location }: Props) => {

	const router = useRouter();
	const { register, control, handleSubmit, formState: {errors} } = useForm<LocationFormData>({ resolver: zodResolver(locationSchema)})

	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = handleSubmit(async (data) => {
		try{
			setIsSubmitting(true);
			if(location){
				console.log(holdingId)
				console.log(data)
				// await axios.patch('/api/holdings/' + holding.id, data);
			}else{
				await axios.post(`/api/holdings/${holdingId}/locations`, data)
			}
			router.push(`/holdings/${holdingId}/locations`);
			router.refresh();
		} catch (error) {
			setIsSubmitting(false);
			setError('An unexpected error occured');
		}
	})

	return (
		<div className='max-w-xl'>
			{error && <Callout.Root color='red' className='mb-5'>
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>}
			<form 
				className='space-y-3' 
				onSubmit={onSubmit}>
					<TextField.Root>
						<TextField.Input 
							defaultValue={location?.title} 
							placeholder='Location Title/Name' 
							{...register('title')}
						/>
					</TextField.Root>
					<FieldErrorMessage>{errors.title?.message}</FieldErrorMessage>

					<TextField.Root>
						<TextField.Input 
							defaultValue={location?.field || ""} 
							placeholder='Secondary field (optional)' 
							{...register('field')}
						/>
					</TextField.Root>
					<FieldErrorMessage>{errors.field?.message}</FieldErrorMessage>

					<Button disabled={isSubmitting}>
						{ location ? 'Update Location' : 'Add New Location' }{' '}
						{isSubmitting && <Spinner />}
					</Button>
					
			</form>
		</div>
	)
}

export default LocationForm