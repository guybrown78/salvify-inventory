'use client'

import { FieldErrorMessage, Spinner } from '@/app/_components';
import { itemSchema } from '@/app/validationSchema';
import { itemTypeList, itemCategoryList, itemGroupingList } from '@/prisma/enums';
import { zodResolver } from '@hookform/resolvers/zod';
import { Item } from '@prisma/client';
import { Button, Callout, Flex, Text, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';
import StockItemSelect from './StockItemSelect';

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

				<Flex gap="5">
					<Flex direction="column" gap="1">
						<Text size="2">Item Type</Text>
						<Controller
							control={control}
							name="type"
							defaultValue={item?.type || "NONE"}
							render={({ field }) => {
								return (
									<StockItemSelect 
										field={field}
										label="type"
										list={itemTypeList}
									/>
						)}} />
					</Flex>

					<Flex direction="column" gap="1">
						<Text size="2">Item Category</Text>
						<Controller
							control={control}
							name="category"
							defaultValue={item?.category || "NONE"}
							render={({ field }) => {
								return (
									<StockItemSelect 
										field={field}
										label="Category"
										list={itemCategoryList}
									/>
						)}} />
					</Flex>


					<Flex direction="column" gap="1">
						<Text size="2">Item Grouping</Text>
						<Controller
							control={control}
							name="grouping"
							defaultValue={item?.grouping || "NONE"}
							render={({ field }) => {
								return (
									<StockItemSelect 
										field={field}
										label="Grouping"
										list={itemGroupingList}
									/>
						)}} />
					</Flex>
				
				</Flex>


				<Controller 
					name="information"
					control={control}
					defaultValue={item?.information || ""}
					render={({ field }) => <SimpleMDE placeholder='Stock Item Information' {...field} />}
				/>
				<FieldErrorMessage>{errors.information?.message}</FieldErrorMessage>

				{/* <Flex gap="3" align="center">
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
			
				<FieldErrorMessage>{errors.requiredCount?.message}</FieldErrorMessage> */}

				<Flex direction="column" gap="1" mt="4">
					<Text size="2">Patient Leaflet (PIL) pdf code</Text>
					<Flex gap="1" align="center">
						<Text>https://www.medicines.org.uk/emc/files/pil.</Text>
						<TextField.Root>
							<TextField.Input 
								type='text' 
								defaultValue={item?.emcId || ""} 
								placeholder='XXXXX' 
								{...register('emcId')} 
							/>
						</TextField.Root>
						<Text>.pdf</Text>
					</Flex>
					<FieldErrorMessage>{errors.emcId?.message}</FieldErrorMessage> 
				</Flex>
			

				<Flex direction="column" gap="1" mt="4">
					<Text size="2">Product Inscructions URL</Text>
					<TextField.Root>
						<TextField.Input defaultValue={item?.instructionsURL || ""} placeholder='Instructions URL' {...register('instructionsURL')} />
					</TextField.Root>
					<FieldErrorMessage>{errors.instructionsURL?.message}</FieldErrorMessage> 
				</Flex>


				<Button disabled={isSubmitting}>
					{ item ? 'Update Stock Item' : 'Create New Stock Item' }{' '}
					{isSubmitting && <Spinner />}
				</Button>

			</form>
		</div>
	)
}





export default StockItemForm