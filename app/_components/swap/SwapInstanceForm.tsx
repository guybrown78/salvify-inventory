'use client'
import { FieldErrorMessage, Spinner } from '@/app/_components';
import { HoldingWithLocations, InstancesWithLocation } from '@/app/_types/types';
import { swapInstanceSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Item, Location } from '@prisma/client';
import { Button, Flex, Select, Text, TextField } from '@radix-ui/themes';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import InstanceLocationExpiryHeader from '../instance/InstanceLocationExpiryHeader';
import SwapHoldings from './SwapHoldings';

type SwapIntstanceDate = z.infer<typeof swapInstanceSchema>
interface Props{
	onFormComplete: () => void;
	instance:InstancesWithLocation,
	item:Item,
	currentHolding:HoldingWithLocations,
}

const SwapInstanceForm = ({ onFormComplete, instance, item, currentHolding }:Props) => {

	const { register, control, handleSubmit, formState: {errors}, setValue, getValues, watch } = useForm<SwapIntstanceDate>({
		resolver: zodResolver(swapInstanceSchema)
	});

	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	
	const [selectedHolding, setSelectedHolding] = useState<HoldingWithLocations | null>(currentHolding);
	const [locations, setLocations] = useState<Location[]>([ ...currentHolding.locations ]);
	const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
	register("holdingId", { value: currentHolding.id });

	const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

	// const changeHoldings = () => {
	// 	console.log("Change Holding!")
	// }

	const onSubmit = handleSubmit(async (data) => {
		try{
			setIsSubmitting(true);
			await axios.patch(`/api/holdings/${data.holdingId}/items/${item.id}/instances/${instance.id}/swap`, data);
			setIsSubmitting(false);
			onFormComplete();
		} catch (error){
			setIsSubmitting(false);
			setError('An unexpected error occured')
		}
	});

	const setHoldingId = (id: number) => {
		const values = getValues()
		if(!values)
			return null;
		if(values.holdingId !== id){
			setValue("holdingId", id)
		}
	}


	const watchLocationChange = () => {
		watch((value, { name, type }) => {
			if (name === 'locationId') {
				setLocationId(); // Call the function to update selected location
			}
		})
	};

	useEffect(() => {
		watchLocationChange();
	}, [locations])

	const setLocationId = () => {
		const values = getValues()
		if(!values)
			return null;
		const parsedValue: number = parseInt(values.locationId);
		if(!parsedValue){
			setSelectedLocation(null);
			return null
		}else{
			if(selectedLocation && selectedLocation.id === parsedValue){
				return null
			}
			const location = locations.find(location => location.id === parsedValue);
			setSelectedLocation(location || null);
		}
	}

	return (
		<div className='max-w-xl'>
			<form 
				className='space-y-3' 
				onSubmit={onSubmit}>

				<Flex direction='column' gap="5">
					<InstanceLocationExpiryHeader 
						locationPreTitle="Current Location:"
						locationTitle={instance.location.title}
						expiryDate={instance.expiryDate} 
					/>

					<SwapHoldings 
						currentHolding={currentHolding} 
						item={item}
						updateSelectedHolding={(holding:HoldingWithLocations | null) => {
							setSelectedHolding(holding)
							if(holding){
						
								setHoldingId(holding.id);
								setLocations([...holding.locations]);
								// 
								const matchingLocations = holding.locations.filter(location => location.id === selectedLocation?.id)
								
								if(selectedLocation && matchingLocations.length <= 0){
									setSelectedLocation(null)
								}
								if(selectedLocation && matchingLocations.length > 0){
									setValue("locationId", selectedLocation.id.toString())
								}
							}
						}}
					/>

					{
						!locations?.length && (
							<Flex direction='column' gap="1">
								<Text size="2">There are no locations for the <em><strong>{selectedHolding?.title}</strong></em> holding. You can only swap instances into another holding with locations. If you want to swap instances of <em><strong>{item.title}</strong></em> into <em><strong>{selectedHolding?.title}</strong></em>, you first need&nbsp;to&nbsp;<Link href={`/holdings/${selectedHolding?.id}/locations`} className='underline font-semibold text-green-600 cursor-pointer'>add locations</Link>.
								</Text>
							</Flex>
						)
					}	
	
					{
						locations?.length > 0 && (
							<Flex direction='column' gap="1">
								<Text>New holding location</Text>
								<Controller 
									control={control}
									name="locationId"
									defaultValue=""
									disabled={!selectedHolding}
									render={({ field }) => {
										return (
											<Select.Root 
												onValueChange={field.onChange} 
												{...field}
											>
												<Select.Trigger />
												<Select.Content>
													<Select.Item value="">Select a location</Select.Item>
													{
														locations.map(location => 
														<Select.Item 
															key={location.id} 
															value={location.id.toString()}
															disabled={location.id === instance.locationId}
														>
															{location.title}
														</Select.Item>)
													}
												</Select.Content>
											</Select.Root>
										)
									}}
								/>
								<FieldErrorMessage>{errors.locationId?.message}</FieldErrorMessage>
							</Flex>
						)
					}	

					{
						selectedLocation && (
							<Flex direction='column' gap="1">
								<Text>
									Amount of stock to be swapped (Max {instance.quantity})
								</Text>
								<Flex gap="2" align="center">
									<TextField.Root className='min-w-20'>
										<TextField.Input 
											type='number' 
											min={1} 
											max={instance.quantity} 
											disabled={!selectedHolding}
											defaultValue={1} 
											{...register('quantity', { valueAsNumber: true })}
										/>
									</TextField.Root>
									{
										selectedHolding && (
											<Text size="2">
												{selectedHolding?.title} &gt; { selectedLocation?.title }
											</Text>
										)
									}
								</Flex>
								<FieldErrorMessage>{errors.quantity?.message}</FieldErrorMessage>
							</Flex>
						)
					}
					

					<Flex justify="end">
						<Button disabled={isSubmitting || !selectedHolding} type="submit">
							{ isSubmitting ? 'Swaping Stock' : 'Swap Stock' }{' '}
							{isSubmitting && <Spinner />}
						</Button>
					</Flex>
				</Flex>

			</form>
		</div>
	)
}

export default SwapInstanceForm