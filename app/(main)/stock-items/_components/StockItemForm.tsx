'use client'

import { useState } from 'react';
import { FieldErrorMessage, Spinner } from '@/app/_components';
import { Button, Callout, Flex, Text, TextField } from '@radix-ui/themes';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import "easymde/dist/easymde.min.css";
import SimpleMDE from 'react-simplemde-editor';
import { Item } from '@prisma/client';
import { itemSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';

type ItemFormData = z.infer<typeof itemSchema>

interface Props {
	item?: Item
}

const StockItemForm = ({ item }: Props) => {
	const router = useRouter();
	const { register, control, handleSubmit, formState: {errors} } = useForm<ItemFormData>({
		resolver: zodResolver(itemSchema)
	});


	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = handleSubmit(async (data) => {
		try{
			setIsSubmitting(true);
			if(item){
				await axios.patch('/api/items/' + item.id, data);
			}else{
				await axios.post('/api/items', data);
			}
			router.push('/stock-items/list');
			router.refresh();
		} catch (error) {		
			setIsSubmitting(false);
			setError('An unexpected error occured')
		}
	});


	return (
		<div className='max-w-xl'>
			{error && <Callout.Root color="red" className='mb-5'>
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>}
			<form 
				className='space-y-3' 
				onSubmit={onSubmit}>
				<TextField.Root>
					<TextField.Input defaultValue={item?.title} placeholder='Title' {...register('title')} />
				</TextField.Root>
				<FieldErrorMessage>{errors.title?.message}</FieldErrorMessage>
				<Controller 
					name="information"
					control={control}
					defaultValue={item?.information || ""}
					render={({ field }) => <SimpleMDE placeholder='Stock Item Information' {...field} />}
				/>
				<FieldErrorMessage>{errors.information?.message}</FieldErrorMessage>
				<Flex gap="3" align="center">
					<Text>Minimum/Required Stock Count</Text>
					<TextField.Root>
						<TextField.Input type='number' min="0" defaultValue={item?.requiredCount || 0} placeholder='Min Stock Count' {
							...register(
								'requiredCount', 
								{ 
									valueAsNumber: true,
								}
							)} />
					</TextField.Root>
				</Flex>
			
				<FieldErrorMessage>{errors.requiredCount?.message}</FieldErrorMessage>
				<Button disabled={isSubmitting}>
					{ item ? 'Update Stock Item' : 'Create New Stock Item' }{' '}
					{isSubmitting && <Spinner />}
				</Button>

			</form>
		</div>
	)
}

export default StockItemForm