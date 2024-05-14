'use client'

import { FieldErrorMessage, Spinner } from '@/app/_components';
import { orderSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Order } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

type OrderFormData = z.infer<typeof orderSchema>

interface Props{
	order?: Order
}

const OrderForm = ({ order }:Props) => {

	const router = useRouter();
	const { register, control, handleSubmit, formState: {errors} } = useForm<OrderFormData>({
		resolver: zodResolver(orderSchema)
	});
	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = handleSubmit(async (data) => {
		try{
			setIsSubmitting(true);
			if(order){
				await axios.patch('/api/orders/' + order.id, data);
			}else{
				await axios.post('/api/orders', data);
			}
			router.push('/orders/list');
			router.refresh();
		} catch (error) {		
			setIsSubmitting(false);
			setError('An unexpected error occured')
		}
	});

	return (
		<div className='max-w-xl'>
			{error && 
				<Callout.Root color="red" className='mb-5'>
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			}
			<form 
				className='space-y-3' 
				onSubmit={onSubmit}>
				
				<TextField.Root>
					<TextField.Input 
						defaultValue={order?.title || ""} 
						placeholder='Title' 
						{...register('title')} 
					/>
				</TextField.Root>
				<FieldErrorMessage>{errors.title?.message}</FieldErrorMessage>

				<Controller 
					name="notes"
					control={control}
					defaultValue={order?.notes || ""}
					render={({ field }) => 
						<SimpleMDE 
							placeholder='Additional notes' 
							{...field} 
						/>}
				/>
				<FieldErrorMessage>{errors.notes?.message}</FieldErrorMessage>

				<Button disabled={isSubmitting}>
					{ order? 'Create Order' : 'Create New Order' }{' '}
					{isSubmitting && <Spinner />}
				</Button>

			</form>
		</div>
	)
}

export default OrderForm