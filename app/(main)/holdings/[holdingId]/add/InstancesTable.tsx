import { NoDataMessage } from '@/app/_components'
import InstanceExpiryDate from '@/app/_components/InstanceExpiryDate';
import { Instance } from '@prisma/client'
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Flex, Table, TableCell, TableColumnHeaderCell, Text } from '@radix-ui/themes';
import React from 'react'
import { InstanceWithLocation } from './InstanceItems';

interface Props {
	instances: InstanceWithLocation[] | null
}
const InstancesTable = ({ instances }: Props) => {
	if(!instances){
		return null
	}
	if(!instances.length)
		return (<NoDataMessage>There are currently no instances for this item in this holding</NoDataMessage>)
		
	return (
		<Table.Root variant='surface'>
				<Table.Header>
					<Table.Row>
					{columns.map((column) => (
						<TableColumnHeaderCell 
							key={column.value} 
							className={column.className}
						>
							{column.label}
						</TableColumnHeaderCell>
					))}
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{instances.map(instance => (
						<Table.Row key={instance.id}>
							<TableCell>
								<Flex direction="column" gap="3">
									<Flex align="center" gap="3">
										<Text weight="bold">{instance.location.title}</Text>
										<Text className='md:hidden'><em>(Stock quantity: {instance.quantity})</em></Text>
									</Flex>
									<div className='flex flex-col gap-3 justify-center md:hidden'>
										{instance.batch && <Text><em>Batch: {instance.batch}</em></Text> }
										<Flex align="center" gap="3">
											<Text><em>Expiring:</em></Text>
											<InstanceExpiryDate 
												expiryDate={instance.expiryDate ? String(instance.expiryDate) : null} 
												showCountdown
											/>
										</Flex>
										
									</div>
								</Flex>
								
							</TableCell>
							<TableCell className='hidden md:table-cell'>
								{instance.quantity}
							</TableCell>
							<TableCell className='hidden md:table-cell'>
								{instance.batch}
							</TableCell>
							<TableCell className='hidden md:table-cell'>
								<InstanceExpiryDate 
									expiryDate={instance.expiryDate ? String(instance.expiryDate) : null} 
									showCountdown
								/>
							</TableCell>
						</Table.Row>
					))}
				</Table.Body>
		</Table.Root>
	)
}


const columns:{ 
	label:string, 
	value: keyof InstanceWithLocation,
	className?:string
}[] = [
	{ label: 'location', value: 'location'},
	{ label: 'Stock', value: 'quantity', className:'hidden md:table-cell'},
	{ label: 'Batch', value: 'batch', className:'hidden md:table-cell'},
	{ label: 'Expiring', value: 'expiryDate', className:'hidden md:table-cell'},
]



export default InstancesTable