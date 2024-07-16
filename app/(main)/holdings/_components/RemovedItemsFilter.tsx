'use client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useHoldingContext } from '@/app/_providers/HoldingProvider';
import React from 'react'


const dayOffsets:{ label: string, value: string}[] = [
	{ label: 'Removed in 30 Days', value: '30' },
	{ label: 'Removed in 60 Days', value: '60' },
	{ label: 'Removed in 90 Days', value: '90' },
]


const RemovedItemsFilter = () => {

	const router = useRouter();
	const currPath = usePathname();
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
				router.push(currPath + query)
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

export default RemovedItemsFilter