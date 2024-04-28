'use client'
import { Skeleton } from '@/app/_components';
import { HoldingWithLocations } from '@/app/_types/types';
import { Item } from '@prisma/client';
import { Button, Flex, Select, Text } from '@radix-ui/themes';
import axios from 'axios';
import { useEffect, useState } from 'react';


interface Props{
	item:Item,
	currentHolding:HoldingWithLocations,
	updateSelectedHolding: (selectedHolding:HoldingWithLocations | null) => void;
}


const SwapHoldings = ({ item, currentHolding, updateSelectedHolding }:Props) => {
	const [previousHolding, setPreviousHolding] = useState<HoldingWithLocations>(currentHolding);
	const [selectedHolding, setSelectedHolding] = useState<HoldingWithLocations | null>(currentHolding);
	const [isLoading, setIsLoading] = useState(true);
	const [holdings, setHoldings] = useState<HoldingWithLocations[] | null>(null);

	useEffect(() => {
		async function fetchData() {
			axios
				.get('/api/holdings')
				.then((response) => {
					setHoldings(response.data)
					setIsLoading(false)
				})
				.catch(err => {
					console.log(err)
					setIsLoading(false)
				})
	

		}
		fetchData();
	}, [])



	useEffect(() => {
		updateSelectedHolding(selectedHolding || null)
	}, [selectedHolding])

	if(isLoading)
		return (
			<Skeleton height="2rem" />
	)

	if(!holdings || !holdings.length)
		return null;

	if(!selectedHolding){
		return (
			<Flex direction="column" className='bg-stone-100 rounded-xl' p="3" gap="3">
				<Flex>
					<Text size="2" color="amber">You are selecting a different holding to <em><strong>{previousHolding!.title}</strong></em>. Once you have selected a new holding, you can then select the location for this items of <em><strong>{item!.title}</strong></em> to be moved.
					</Text>
				</Flex>
				<Flex direction='column' gap="1">
					<Text>Holding</Text>
					<Select.Root 
						defaultValue={previousHolding.id.toString()}
						onValueChange={(value) => {
							if(value){
								const id:number = parseInt(value)
								const holding = holdings.filter(holding => holding.id === id)[0]
								setSelectedHolding(holding)
							}
						}}
					>
						<Select.Trigger />
						<Select.Content>
							<Select.Item value="">Select a holding</Select.Item>
							{holdings.map(holding => (
								<Select.Item key={holding.id} value={holding.id.toString()}>{holding.title}</Select.Item>
							))}
						</Select.Content>
					</Select.Root>
				</Flex>
				<Flex justify="end">
					<Button 
						variant="ghost"
						onClick={() => setSelectedHolding(previousHolding)}
					>Cancel</Button>
				</Flex>
			</Flex>
		)
	}

	return (
		<Flex className='bg-stone-100 rounded-xl' p="3">
			<Text size="2">The current holding is set as <em><strong>{selectedHolding!.title}</strong></em>. You can swap <em><strong>{item!.title}</strong></em> items into locations within this holding or&nbsp;
				<span 
					className='underline font-semibold text-green-600 cursor-pointer'
					onClick={() => {
						setPreviousHolding(selectedHolding)
						setSelectedHolding(null)
					}}
				>
					change holding
				</span>
			</Text>
		</Flex>
	)
}

export default SwapHoldings