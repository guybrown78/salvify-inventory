'use client'

import Skeleton from '@/app/_components/Skeleton'
import { Order, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const AssignUserToOrder = ({ order }: { order: Order }) => {

	const { data: users, error, isLoading } = useUsers();

	if(isLoading) return <Skeleton height="2rem"/>
	if (error) return null;

	const assignOrder = (userId: string) => {
		axios
			.patch('/api/orders/' + order.id, { 
				assignedToUserId: userId || null 
			})
			.catch(() => {
				toast.error("Changes could not be saved")
			})
	}

	return (
		<>
			<Select.Root 
				defaultValue={order.assignedToUserId || ""}
				onValueChange={assignOrder}>
				<Select.Trigger />
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
			<Toaster />
		</>
	)
}


const useUsers = () => useQuery<User[]>({
	queryKey:['users'],
	queryFn: () => axios.get<User[]>('/api/users').then(res => res.data),
	staleTime: 60 * 1000,
	retry: 3
});


export default AssignUserToOrder