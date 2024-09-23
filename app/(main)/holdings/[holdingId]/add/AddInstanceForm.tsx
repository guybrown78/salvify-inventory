'use client'

import { FieldErrorMessage, Spinner } from '@/app/_components';
import { addInstanceSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Item, Location } from '@prisma/client';
import { Box, Button, Flex, Grid, Heading, Text, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import classNames from 'classnames';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type AddInstanceFormData = z.infer<typeof addInstanceSchema>

interface Props{
	items: Item[]
	locations: Location[]
	onSelectItem: (selectedItem: Item | null) => void;
	onInstanceAdded: () => void;
}
const AddInstanceForm = ({ items, locations, onSelectItem, onInstanceAdded }: Props) => {

	const router = useRouter();

	const { register, control, handleSubmit, formState: {errors} } = useForm<AddInstanceFormData>({ resolver: zodResolver(addInstanceSchema)})

	
	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [selectedItem, setSelectedItem] = useState<Item | null>(null);

	const onSubmit = handleSubmit(async (data) => {
		try{
			setIsSubmitting(true);
			await axios.post('/api/instances', data)
			router.refresh();
			onInstanceAdded();
			setIsSubmitting(false);
		} catch (error) {
			setIsSubmitting(false);
			setError('An unexpected error occured');
		}
	})

	const onSelectedItem = (itemId:number) => {
		const item = items.filter(item => item.id === itemId)[0]
		setSelectedItem(item || null)
		onSelectItem(item);
	}

	return (
		<form 
			className='space-y-3' 
			onSubmit={onSubmit}
		>
			<Flex direction="column" gap="8">
				<Box>
					<Text size="2">Item the instance is from</Text>
					<select
						className="block w-full rounded-md border-0 py-2 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-grass-600 sm:text-md sm:leading-6"
						{...register('itemId')}
						onChange={(e) => {
							onSelectedItem(parseInt(e.target.value))
						}}
					>
						<option className='text-base-accent' value="">Select an Item</option>
						{
							items.map(item => <option key={item.id} value={item.id}>{item.title}</option>)
						}
					</select>
					<FieldErrorMessage>{errors.itemId?.message}</FieldErrorMessage>
				</Box>
					
				<div 
					className={classNames(
						!selectedItem ? 'hidden' : '',
						'flex flex-col gap-8'
					)}
				>
					<Box>
						<Heading mb="3" as="h3" size="3">Create a new instance</Heading>
						<Text>This information will be added as an instance to the instances list for <strong>{selectedItem?.title}</strong></Text>
					</Box>
					<Box>
						<Text size="2">Location</Text>
						<select
							className="block w-full rounded-md border-0 py-2 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-green-600 sm:text-md sm:leading-6"
							{...register('locationId')}
						>
							<option className='text-base-accent' value="">Select a Location</option>
							{
								locations.map(location => <option key={location.id} value={location.id}>{location.title}</option>)
							}
						</select>
						<FieldErrorMessage>{errors.locationId?.message}</FieldErrorMessage>
					</Box>					
						
					<Grid columns={{ initial: "1", sm: "3"}} gap="5" >

					<Box>
						<Text size="2">Instance Expiry Date</Text>
						<TextField.Root>
							<TextField.Input type="date" {...register('expiryDate')}/>
						</TextField.Root>
						<FieldErrorMessage>{errors.expiryDate?.message}</FieldErrorMessage>
					</Box>

					<Box>
						<Text size="2">Quantity</Text>
						<TextField.Root>
							<TextField.Input type="number" {...register('quantity')}/>
						</TextField.Root>
						<FieldErrorMessage>{errors.quantity?.message}</FieldErrorMessage>
					</Box>

					<Box>
						<Text size="2">Batch</Text>
						<TextField.Root>
							<TextField.Input type="text" min={0} {...register('batch')}/>
						</TextField.Root>
						<FieldErrorMessage>{errors.batch?.message}</FieldErrorMessage>
					</Box>

					</Grid>				
			
					<Button type="submit" disabled={isSubmitting}>
						
						{ isSubmitting ? 'Adding Instance' : 'Add Instance' }{' '}
						{isSubmitting && <Spinner />}
					</Button>
				</div>	
				
			</Flex>
			

		</form>
	)
}

export default AddInstanceForm