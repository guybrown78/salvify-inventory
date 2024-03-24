import React, { useState } from 'react'
import { FieldErrorMessage, Spinner } from '@/app/_components';
import { Button, Callout, Flex, Select, Text, TextField } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { removeInstanceReasonList } from '@/prisma/enums';
import { InstancesWithLocation } from '@/app/_types/types';
import InstanceExpiryDate from '../InstanceExpiryDate';
import { Item } from '@prisma/client';

interface Props{
	onFormComplete: () => void;
	instance:InstancesWithLocation,
	item:Item
}
const RemoveInstanceForm = ({ onFormComplete, instance }:Props) => {

	const { handleSubmit } = useForm()
	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

	const onSubmit = handleSubmit(async (data) => {
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

					<Flex justify="between">
						<Flex gap="1" align="end">
							<Text>Location:</Text>
							<Text size="4">{instance.location.title}</Text>
						</Flex>
						<InstanceExpiryDate 
							expiryDate={String(instance.expiryDate)} 
							size="sm" 
							asBadge
						/>
					</Flex>
					<Select.Root>
						<Select.Trigger />
						<Select.Content>
							<Select.Group>
								<Select.Label>Reason</Select.Label>
								{
									removeInstanceReasonList.map(item => <Select.Item key={item.value} value={item.value}>{item.label}</Select.Item>)
								}
							</Select.Group>
						</Select.Content>
					</Select.Root>

								
					
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