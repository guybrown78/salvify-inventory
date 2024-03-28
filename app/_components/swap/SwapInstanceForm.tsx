'use client'
import { FieldErrorMessage, Spinner } from '@/app/_components';
import { InstancesWithLocation } from '@/app/_types/types';
import { removeInstanceSchema } from '@/app/validationSchema';
import { removeInstanceReasonList } from '@/prisma/enums';
import { zodResolver } from '@hookform/resolvers/zod';
import { RemoveInstanceReason } from '@prisma/client';
import { Button, Flex, Select, Text, TextField } from '@radix-ui/themes';
import axios from 'axios';
import classNames from 'classnames';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import InstanceLocationExpiryHeader from '../instance/InstanceLocationExpiryHeader';

interface Props{
	onFormComplete: () => void;
	instance:InstancesWithLocation,
	itemId:number,
	holdingId:number
}

const SwapInstanceForm = ({ onFormComplete, instance, itemId, holdingId }:Props) => {

	const { handleSubmit } = useForm();

	const [isSubmitting, setIsSubmitting] = useState(false);

	const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

	const onSubmit = handleSubmit(async (data) => {
		// 
		console.log(data);	
		setIsSubmitting(true);
		wait().then(() => {
			setIsSubmitting(false);
			onFormComplete();
		});	
	});


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