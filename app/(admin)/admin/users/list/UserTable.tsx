
import React from 'react'
import { Table, TableCell, TableColumnHeaderCell } from '@radix-ui/themes';
import NextLink from 'next/link';
import { User } from '@prisma/client';

interface Props {
	users: User[]
}


const UserTable = ({ users }:Props ) => {
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
				{users.map(user => (
					<Table.Row key={user.id}>
						<TableCell>{user.name}</TableCell>
						<TableCell className='hidden md:table-cell'>
							{user.email}
						</TableCell>
						<TableCell className='hidden md:table-cell'>
							{user.role}
						</TableCell>
					</Table.Row>
				))}
			</Table.Body>
		</Table.Root>
	)
}


const columns:{ 
	label:string, 
	value: keyof User,
	className?:string
}[] = [
	{ label: 'Name', value: 'name'},
	{ label: 'Email', value: 'email'},
	{ label: 'Role', value: 'role'},
]

export const columnNames = columns.map(column => column.value);

export default UserTable