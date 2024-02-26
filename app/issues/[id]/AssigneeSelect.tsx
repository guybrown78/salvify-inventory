'use client'

import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Skeleton from '@/app/components/Skeleton'
import React, { useState, useEffect } from 'react'

const AssigneeSelect = ({ issue }: { issue: Issue }) => {

	const { data: users, error, isLoading } = useQuery<Users[]>({
		queryKey:['users'],
		queryFn: () => axios.get<User[]>('/api/users').then(res => res.data),
		staleTime: 60 * 1000,
		retry: 3
	})
	
	// const [users, setUsers] = useState<User[]>([])

	// useEffect(() => {
	// 	const fetchUsers = async () => {
	// 		const {data} = await axios.get<User[]>('/api/users');
	// 		setUsers(data);
	// 	}
	// 	fetchUsers();
	// }, [])

	if(isLoading) return <Skeleton height="2rem"/>
	if (error) return null;

	return (
		<Select.Root 
			defaultValue={issue.assignedToUserId || ""}
			onValueChange={(userId) => {
				axios.patch('/api/issues/' + issue.id, { assignedToUserId: userId || null })
			}}>
			<Select.Trigger placeholder='Assign...' />
			<Select.Content>
				<Select.Group>
					<Select.Label>Suggestions</Select.Label>
					<Select.Item value="">Unassign</Select.Item>
					{users?.map(user => 
						<Select.Item 
							key={user.id} 
							value={user.id}
						>{user.name}</Select.Item>
					)}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	)
}

export default AssigneeSelect