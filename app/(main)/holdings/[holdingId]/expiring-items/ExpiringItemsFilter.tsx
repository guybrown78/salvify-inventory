'use client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import { useHoldingContext } from '@/app/_providers/HoldingProvider';
import React from 'react'


const dayOffsets:{ label: string, value: string}[] = [
	{ label: 'Expiring in 30 Days', value: '30' },
	{ label: 'Expiring in 60 Days', value: '60' },
	{ label: 'Expiring in 90 Days', value: '90' },
	{ label: 'Expiring in 120 Days', value: '120' },
	// { label: 'TEST', value: '500' }
]


const ExpiringItemsFilter = () => {

	const router = useRouter();
	const searchParams = useSearchParams();
	const { currentHolding } = useHoldingContext()

	return (
		<Select.Root 
			defaultValue={searchParams.get('offset') || '30'}
			onValueChange={(offset) => {
				const params = new URLSearchParams()
				if(offset) 
					params.append('offset', offset);
				// if(searchParams.get('orderBy')) 
				// 	params.append('orderBy', searchParams.get('orderBy')!);
				const query = params.size ? '?' + params.toString() : '';
				router.push(`/holdings/${currentHolding?.id}/expiring-items` + query)
			}}>
			<Select.Trigger />
			<Select.Content>
				{dayOffsets.map(offset => (
					<Select.Item key={offset.value} value={offset.value}>
						{offset.label}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	)
}

export default ExpiringItemsFilter