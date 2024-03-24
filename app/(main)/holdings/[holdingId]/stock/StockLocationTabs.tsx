'use client'

import React from 'react'
import { Button, Flex, Tabs, Box, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { Location } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useHoldingContext } from '@/app/_providers/HoldingProvider'

interface Props{
	locations:Location[]
}

const StockLocationTabs = ({ locations }: Props) => {

	const router = useRouter();
	const searchParams = useSearchParams();
	const { currentHolding } = useHoldingContext()
	return (
		<Flex justify='between'>
			<Tabs.Root 
				className='w-full'
				defaultValue={searchParams.get('location') || ''}
				onValueChange={(location) => {
					const params = new URLSearchParams()
					if(location) 
						params.append('location', location);
					// add order / pag etc
					const query = params.size ? '?' + params.toString() : '';
					router.push(`/holdings/${currentHolding!.id}/stock` + query)
				}}
			>
				<Tabs.List>
					<Tabs.Trigger value="">All</Tabs.Trigger>
					{
						locations.map(location => 
							<Tabs.Trigger 
								key={location.id} 
								value={String(location.id)}
							>
								{location.title}
							</Tabs.Trigger>)
					}
				</Tabs.List>
			</Tabs.Root>


		</Flex>
	)
}

export default StockLocationTabs
