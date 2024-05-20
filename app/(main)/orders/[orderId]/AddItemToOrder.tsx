'use client'
import { Spinner, StockItemCategoryBadge, StockItemGroupingBadge, StockItemTypeBadge } from '@/app/_components';
import { addOrderItemSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Item } from '@prisma/client';
import { Box, Button, Card, Flex, Text, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type AddOrderItemFormData = z.infer<typeof addOrderItemSchema>


interface Props{
	item: Item | null
	orderId: number
	clientId: number
	onItemAdded: () => void
}


const AddItemToOrder = ({item, orderId, clientId, onItemAdded}:Props) => {

	const router = useRouter();

	const { register, control, handleSubmit, setValue, formState: {errors} } = useForm<AddOrderItemFormData>({ resolver: zodResolver(addOrderItemSchema)})

	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	if(!item){
		return null
	}

	setValue("itemId", item.id);
	setValue("quantity", "0");

	const onSubmit = handleSubmit(async (data) => {
		try{
			setIsSubmitting(true);
			await axios.post(`/api/orders/${orderId}/item`, data)
			router.refresh();
			onItemAdded();
			setIsSubmitting(false);
		} catch (error) {
			setIsSubmitting(false);
			setError('An unexpected error occured');
		}
	})


	return (
		<Card>
			<form onSubmit={onSubmit}>
			<Flex direction="column" gap="2">
				<Text weight="bold" size="2">{item.title}</Text>
				<Flex gap="1">
					<StockItemTypeBadge itemType={item.type} />
					<StockItemCategoryBadge itemCategory={item.category} />
					<StockItemGroupingBadge itemGrouping={item.grouping} />
				</Flex>
				<Flex align="end" justify="between" mt="4">
					<Box>
						<Text weight="bold" size="2">Quantity</Text>
						<TextField.Root>
							<TextField.Input 
								type="number" 
								min={1}
								defaultValue={0}
								disabled={isSubmitting}
								{...register('quantity')}
							/>
						</TextField.Root>
					</Box>
					<Button type="submit" disabled={isSubmitting}>
						{ isSubmitting ? 'Adding to Order' : 'Add to Order' }{' '}
						{isSubmitting && <Spinner />}
					</Button>
				</Flex>
			</Flex>
			</form>
		</Card>
	)
}

export default AddItemToOrder