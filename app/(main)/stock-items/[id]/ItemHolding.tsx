"use client"
import { Spinner } from '@/app/_components'
import {
	HoldingWithLocations,
	ItemWithInstancesHoldingItems
} from '@/app/_types/types'
import { HoldingItem } from '@prisma/client'
import {
	Box,
	Button,
	Card,
	Flex,
	Switch,
	Text,
	TextField
} from '@radix-ui/themes'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react'

interface Props {
	holding: HoldingWithLocations
	item:ItemWithInstancesHoldingItems
}

enum CallType {
	POST,
	PATCH,
	DELETE
}
const ItemHolding = ({ holding, item }:Props) => {
	
	const getCallType = ():CallType => {
		if(!holdingItem){
			return CallType.POST
		}
		if(holdingItem && !holdingItemSelected){
			return CallType.DELETE
		}
		return CallType.PATCH
	}

	const getButtonLabel = (callType:CallType):string => {
		if(callType === CallType.POST){
			return isSubmitting ? 'Adding Item to Holding' : 'Add Item to Holding'
		}
		if(callType === CallType.DELETE){
			return isSubmitting ? 'Removing Item from Holding' : 'Remove Item from Holding'
		}
		return isSubmitting ? 'Updating Item in Holding' : 'Update Item in Holding'
	}

	const router = useRouter();
	const [holdingItem, setHoldingItem] = useState<HoldingItem | null>(null);
	const [attached, setAttached] = useState<boolean>();
	const [holdingItemSelected, setHoldingItemSelected] = useState<boolean>();
	const [holdingItemCount, setHoldingItemCount] = useState<number>();
	const [isSubmitting, setIsSubmitting] = useState<boolean>();
	const [buttonDisabled, setButtonDisabled] = useState<boolean>();
	const [buttonLabel, setButtonLabel] = useState<string>();
	

	const onCheckedChange = (checked:boolean) => {
		setHoldingItemSelected(checked);
		setButtonDisabled(!(checked !== attached));
	}

	const onMinCountChange = (event:ChangeEvent<HTMLInputElement>) => {
		const value:number = parseInt(event.target.value)
		if (!isNaN(value) && value >= 0) {
			setHoldingItemCount(value);
			if(holdingItem){
				setButtonDisabled(!(value !== holdingItem.requiredMinCount));
			}
			
		}
	}
	
	useEffect(() => {
		const buttonLabel = getButtonLabel(getCallType())
		setButtonLabel(buttonLabel);

	}, [buttonDisabled, isSubmitting]);

	useEffect(() => {
		const parsedHoldingItem:HoldingItem | null = item.holdingItems ? item.holdingItems.filter(holdingItem => holdingItem.holdingId === holding.id)[0] : null;
		// 
		setHoldingItem(parsedHoldingItem);
		setAttached(parsedHoldingItem ? true : false)
		setHoldingItemSelected(parsedHoldingItem ? true : false)
		setHoldingItemCount(parsedHoldingItem ? parsedHoldingItem.requiredMinCount || 0 : 0)
		setButtonDisabled(true);
	}, [item]);
	
	const onSuccess = () => {
		setIsSubmitting(false);
		toast.success('Holding Item request complete',
			{
				id:"holdItemSuccessToast",
				duration:3500,
				position: "bottom-right",
			}
		)
		router.push(`/stock-items/${item.id}`);
		router.refresh();
	}

	const onError = () => {
		setIsSubmitting(false);
			toast.error("Sorry, we couldn't complete that request",
				{
					id:"holdItemErrorToast",
					duration:3500,
					position: "bottom-right",
				}
			)
	}
	const onButtonClicked = async () => {
		if(holdingItemCount && holdingItemCount < 0){
			return null
		}
		const data = { requiredMinCount: holdingItemCount }
		try{
			setIsSubmitting(true);
			const endpoint = `/api/holdings/${holding.id}/items/${item.id}/holding-item`;
			const callType = getCallType();
			await callType === CallType.POST ? axios
					.post(endpoint, data)
					.then(() => onSuccess())
					.catch(() => onError()) : 
				callType === CallType.PATCH ? axios
					.patch(endpoint + '/' + holdingItem?.id, data)
					.then(() => onSuccess())
					.catch(() => onError()) : 
				axios
					.delete(endpoint + '/' + holdingItem?.id)
					.then(() => onSuccess())
					.catch(() => onError());
		} catch (error){
			onError();
		}
	}

	return (
		<Box width="100%">
			<Card>
				<Flex gap="3" justify="between" align="center">
					<Flex direction="column" gap="2">
						
						<Text>{holding.title}</Text>

						<Flex 
							gap={{ initial: "2", md: "5"}} 
							align={{ initial: "start", md: "center"}} 
							direction={{ initial: "column", md: "row"}} 
						>
							<Flex gap="2" align="center">
								<Text size="2">
									Include item in this holding?
								</Text>
								<Switch 
									radius="full" 
									// defaultChecked={attached}
									checked={holdingItemSelected}
									onCheckedChange={onCheckedChange}
								/>
							</Flex>

							<Flex gap="2" align="center">
								<Text size="2">
									Minimum/Required Holding Stock Count
								</Text>
								<TextField.Root>
									<TextField.Input 
										type='number' 
										min="0" 
										value={holdingItemCount}
										placeholder='Min Stock Count' 
										onChange={onMinCountChange}
									/>
								</TextField.Root>
							</Flex>
						</Flex>
						
						<Flex gap="5" align="center">
							<Flex gap="2" align="center">
								<Text size="2">
									Item Instance count:
								</Text>
								<Text size="2">
									0
								</Text>
								<Text size="2"></Text>
							</Flex>

							{/* <Flex gap="2" align="center">
								<Text size="2">
									Holding Locations:
								</Text>
								<Text size="2">
									0
								</Text>
							</Flex> */}

						</Flex>


					</Flex>
					<Button 
						disabled={buttonDisabled || isSubmitting}
						onClick={onButtonClicked}
					>
						{ buttonLabel }{' '}{isSubmitting && <Spinner />}
					</Button>
				</Flex>
			</Card>
			<Toaster />
		</Box>
		
	)
}

export default ItemHolding