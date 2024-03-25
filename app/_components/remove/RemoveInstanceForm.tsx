'use client'
import React, { useState, useEffect } from 'react'
import { FieldErrorMessage, Spinner } from '@/app/_components';
import { Button, Callout, Flex, Select, Text, TextField, Em } from '@radix-ui/themes';
import { Controller, useForm } from 'react-hook-form';
import { removeInstanceReasonList } from '@/prisma/enums';
import { InstancesWithLocation } from '@/app/_types/types';
import InstanceExpiryDate from '../InstanceExpiryDate';
import { Item, RemoveInstanceReason } from '@prisma/client';
import { z } from 'zod';
import { removeInstanceSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import classNames from 'classnames';

type RemoveInstanceData = z.infer<typeof removeInstanceSchema>

interface AdditionalError{
	message:string
	type:string
}
interface AdditionalErrors{
	prf?:AdditionalError
	otherReason?:AdditionalError
}
interface Props{
	onFormComplete: () => void;
	instance:InstancesWithLocation,
	item:Item
}
const RemoveInstanceForm = ({ onFormComplete, instance }:Props) => {
	const router = useRouter();
	const { register, control, watch, handleSubmit, formState: {errors} } = useForm<RemoveInstanceData>({
		resolver: zodResolver(removeInstanceSchema)
	});

	const reasonValue = watch('reason');

	const [error, setError] = useState('');
	const [additionalErrors, setAdditionalErrors] = useState<AdditionalErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [customDate, setCustomDate] = useState(false)

	const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

	const today = moment();

	const additionalValidation = async (data:any) => {
		let flag = false;
		const errors: AdditionalErrors = {};
		setAdditionalErrors(errors)
		if(data.reason === RemoveInstanceReason.USED && !data.prf.length){
			const err = additionalErrors
			errors.prf = {
				message:"A PRF number is needed when using instances for treatments",
				type:"required"
			}
			setAdditionalErrors(errors)
			flag = true;
		}
		if(data.reason === RemoveInstanceReason.OTHER && !data.otherReason.length){
			const err = additionalErrors
			errors.otherReason = {
				message:"Add your reason for removing instances",
				type:"required"
			}
			setAdditionalErrors(errors)
			flag = true;
		}
		return flag;
	}

	useEffect(() => {
		setAdditionalErrors({})
	}, [reasonValue])

	const onSubmit = handleSubmit(async (data) => {
		const isAdditionalValidation = await additionalValidation(data);
		if(isAdditionalValidation){
			return
		}
		// 
		setIsSubmitting(true);
		wait().then(() => {
			setIsSubmitting(false);
			onFormComplete();
		});
	});

	const toDateInputValue = () => {
		const date = new Date();
    // const futureDate = date.getDate() + 3;
    // date.setDate(futureDate);
    const defaultValue = date.toLocaleDateString('en-GB');
	};

	return (
		<div className='max-w-xl'>
			<form 
				className='space-y-3' 
				onSubmit={onSubmit}>

				<Flex direction='column' gap="5">

					<Flex justify="between">
						<Flex gap="1" align="end">
							<Text>Location:</Text>
							<Text size="4" weight="bold">{instance.location.title}</Text>
						</Flex>
						<InstanceExpiryDate 
							expiryDate={String(instance.expiryDate)} 
							size="sm" 
							asBadge
						/>
					</Flex>

					<Flex direction='column' gap="1">
						<Text>Reason for deduction</Text>
						<Controller 
							control={control}
							name="reason"
							render={({ field }) => {
								return (
									<Select.Root
										onValueChange={field.onChange} 
										{...field}
									>
										<Select.Trigger />
										<Select.Content>
											<Select.Group>
												<Select.Label>Reason</Select.Label>
												{
													removeInstanceReasonList.map(item => 
													<Select.Item 
														key={item.value} 
														value={item.value}
													>
														{item.label}
													</Select.Item>)
												}
											</Select.Group>
										</Select.Content>
									</Select.Root>
								)
							}}
						/>
						<FieldErrorMessage>{errors.reason?.message}</FieldErrorMessage>
					</Flex>
					
					{reasonValue === RemoveInstanceReason.OTHER && (
					<Flex direction='column' gap="1">
						<Text>Add the reason for removal</Text>
						<TextField.Root className='flex-1'>	
							<TextField.Input type='text' placeholder='Add the removal reason' {...register('otherReason')}/>
						</TextField.Root>
						<FieldErrorMessage>{errors.otherReason?.message || additionalErrors?.otherReason?.message}</FieldErrorMessage>
					</Flex>
					)}

					<Flex direction='column' gap="1">
						<Text>Amount of stock to be deducted (Max {instance.quantity})</Text>
						<TextField.Root>
							<TextField.Input type='number' min={1} max={instance.quantity} defaultValue={1} {...register('quantity', { valueAsNumber: true })}/>
						</TextField.Root>
						<FieldErrorMessage>{errors.quantity?.message}</FieldErrorMessage>
					</Flex>
					
					<Flex direction='column' gap="1">
						<Text>Patient Report Form (PRF) number</Text>
						<TextField.Root className='flex-1'>	
							<TextField.Input type='text' placeholder='Enter PRF' {...register('prf')}/>
						</TextField.Root>
						<FieldErrorMessage>{errors.prf?.message || additionalErrors?.prf?.message}</FieldErrorMessage>
					</Flex>
					

					<Flex direction='column' gap="1">
						<Text>Date instance was removed</Text>

							<TextField.Root className={classNames(!customDate ? "!hidden" : "inline-flex", 'flex-1')}>	
								<TextField.Input 
									type="date" 
									defaultValue={today.format('YYYY-MM-DD')} 
									{...register('removedAt')}
								/>
							</TextField.Root>
					
						{
							!customDate && (
								<Text>
									Today: {today.format('Do MMM YYYY')} 
									<span 
										className='underline text-sm font-semibold text-green-600 cursor-pointer'
										onClick={() => setCustomDate(true)}
									>
										(change)
									</span>
								</Text>
							)
						}

						<FieldErrorMessage>{errors.removedAt?.message}</FieldErrorMessage>
					</Flex>

					<Flex justify="end">
						<Button disabled={isSubmitting} type="submit">
							{ isSubmitting ? 'Removing Stock' : 'Remove Stock' }{' '}
							{isSubmitting && <Spinner />}
						</Button>
					</Flex>
					
				</Flex>

			</form>
		</div>
	)
}

export default RemoveInstanceForm