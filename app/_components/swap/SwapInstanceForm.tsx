'use client'
import { FieldErrorMessage, Spinner } from '@/app/_components';
import { HoldingWithLocations, InstancesWithLocation } from '@/app/_types/types';
import { swapInstanceSchema } from '@/app/validationSchema';
import { removeInstanceReasonList } from '@/prisma/enums';
import { zodResolver } from '@hookform/resolvers/zod';
import { Item, Location, RemoveInstanceReason } from '@prisma/client';
import { Button, Flex, Select, Text, TextField } from '@radix-ui/themes';
import axios from 'axios';
import classNames from 'classnames';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import InstanceLocationExpiryHeader from '../instance/InstanceLocationExpiryHeader';

type SwapIntstanceDate = z.infer<typeof swapInstanceSchema>
interface Props{
	onFormComplete: () => void;
	instance:InstancesWithLocation,
	item:Item,
	currentHolding:HoldingWithLocations,
}

const SwapInstanceForm = ({ onFormComplete, instance, item, currentHolding }:Props) => {

	const { register, control, handleSubmit, formState: {errors} } = useForm<SwapIntstanceDate>({
		resolver: zodResolver(swapInstanceSchema)
	});

	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

	const changeHoldings = () => {
		console.log("Change Holding!")
	}
	const onSubmit = handleSubmit(async (data) => {
		// 
		console.log(data);	
		setIsSubmitting(true);
		wait().then(() => {
			setIsSubmitting(false);
			onFormComplete();
		});	
	});


	const locations:Location[] = currentHolding.locations;

	return (
		<div className='max-w-xl'>
			<form 
				className='space-y-3' 
				onSubmit={onSubmit}>

				<Flex direction='column' gap="5">
					<InstanceLocationExpiryHeader 
						locationPreTitle="Current Location:"
						locationTitle={instance.location.title}
						expiryDate={String(instance.expiryDate)} 
					/>


					<Flex>
						<Text>You are currently in holding <em>{currentHolding!.title}</em>. You can swap <em>{item!.title}</em> items into locations within this holding or&nbsp;
							<span 
								className='underline text-sm font-semibold text-green-600 cursor-pointer'
								onClick={changeHoldings}
							>
								change holding
							</span>
						</Text>
					</Flex>

					<Flex direction='column' gap="1">
						<Text>New holding location</Text>
						<Controller 
							control={control}
							name="locationId"
							defaultValue=""
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
													value={String(location.id)}
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

					<Flex justify="end">
						<Button disabled={isSubmitting} type="submit">
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