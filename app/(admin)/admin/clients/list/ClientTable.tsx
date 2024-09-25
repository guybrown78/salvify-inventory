
import React from 'react'
import { Table, TableCell, TableColumnHeaderCell } from '@radix-ui/themes';
import NextLink from 'next/link';
import { Client } from '@prisma/client';
import Link from 'next/link';
import { ClientWithUserItems } from '@/app/_types/clientTypes';

interface Props {
  clients: ClientWithUserItems[]
}


const ClientTable = ({ clients }:Props) => {
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
				{clients.map(client => (
					<Table.Row key={client.id}>
						<TableCell>
							<Link href={`/admin/clients/${client.id}`}>{client.name}</Link>
						</TableCell>
						<TableCell className="text-center">{client.users.length}</TableCell>
            <TableCell className="text-center">{client.items.length}</TableCell>
					</Table.Row>
				))}
			</Table.Body>
		</Table.Root>
	)
}

const columns:{ 
	label:string, 
	value: keyof ClientWithUserItems,
	className?:string
}[] = [
	{ label: 'Name', value: 'name'},
	{ label: 'Users', value: 'users', className: 'text-center' }, 
  { label: 'Items', value: 'items', className: 'text-center' },
]

export const columnNames = columns.map(column => column.value);


export default ClientTable