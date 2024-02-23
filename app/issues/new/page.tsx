'use client'
import FieldErrorMessage from '@/app/components/FieldErrorMessage';
import Spinner from '@/app/components/Spinner';
import { createIssueSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import delay from 'delay';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import { z } from 'zod';

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
	const router = useRouter();
	const { register, control, handleSubmit, formState: {errors} } = useForm<IssueForm>({
		resolver: zodResolver(createIssueSchema)
	});
	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = handleSubmit(async (data) => {
		try{
			setIsSubmitting(true);
			await axios.post('/api/issues', data);
			router.push('/issues');
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
					<TextField.Input placeholder='Title' {...register('title')} />
				</TextField.Root>
				<FieldErrorMessage>{errors.title?.message}</FieldErrorMessage>
				<Controller 
					name="description"
					control={control}
					render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
				/>
				<FieldErrorMessage>{errors.description?.message}</FieldErrorMessage>
				<Button disabled={isSubmitting}>Create New Issue {isSubmitting && <Spinner />}</Button>
			</form>
		</div>
		
	)
}

export default NewIssuePage