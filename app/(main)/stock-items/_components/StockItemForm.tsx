'use client'

import React, { useState, forwardRef } from 'react';
import { FieldErrorMessage, Spinner } from '@/app/_components';
import { Button, Callout, Flex, Select, Text, TextField } from '@radix-ui/themes';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import "easymde/dist/easymde.min.css";
import SimpleMDE from 'react-simplemde-editor';
import { Item, ItemTypes } from '@prisma/client';
import { itemSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { itemTypesMap, itemCategoryMap, itemGroupingMap } from '@/prisma/enums'

type ItemMapValue = { label: string; color: 'gray' | 'red' | 'violet' | 'green' };

const convertMapToList = (map: Record<string, ItemMapValue>): { label: string; value: string }[] => {
  return Object.entries(map).map(([value, { label }]) => ({ label, value }));
};

// const convertMapToList = (map:any) => Object.entries(map).map(([value, { label }]) => ({ label, value }));

const itemTypeList:{label:string, value:string}[] = convertMapToList(itemTypesMap);
const itemCategoryList:{label:string, value:string}[] = convertMapToList(itemCategoryMap);
const itemGroupingList:{label:string, value:string}[] = convertMapToList(itemGroupingMap);


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
					<Controller
						control={control}
						name="type"
						defaultValue={item?.type || "NONE"}
						render={({ field }) => {
							return (
								<Select.Root 
									onValueChange={field.onChange} 
									{...field}
								>
									<Select.Trigger />
									<Select.Content>
										<Select.Group>
											<Select.Label>Type</Select.Label>
											{
												itemTypeList?.map(type => <Select.Item key={`type_${type.value}`} value={type.value}>{type.label}</Select.Item>)
											}
										</Select.Group>
									</Select.Content>
								</Select.Root>
					)}} />

					<Controller
						control={control}
						name="category"
						defaultValue={item?.category || "NONE"}
						render={({ field }) => {
							return (
								<Select.Root 
									onValueChange={field.onChange} 
									{...field}
								>
									<Select.Trigger />
									<Select.Content>
										<Select.Group>
											<Select.Label>Category</Select.Label>
											{
												itemCategoryList?.map(category => <Select.Item key={`cat_${category.value}`} value={category.value}>{category.label}</Select.Item>)
											}
										</Select.Group>
									</Select.Content>
								</Select.Root>
					)}} />

					<Controller
						control={control}
						name="grouping"
						defaultValue={item?.grouping || "NONE"}
						render={({ field }) => {
							return (
								<Select.Root 
									onValueChange={field.onChange} 
									{...field}
								>
									<Select.Trigger />
									<Select.Content>
										<Select.Group>
											<Select.Label>Grouping</Select.Label>
											{
												itemGroupingList?.map(grouping => <Select.Item key={`grouping_${grouping.value}`} value={grouping.value}>{grouping.label}</Select.Item>)
											}
										</Select.Group>
									</Select.Content>
								</Select.Root>
					)}} />
				</Flex>


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