import AdminMain from '@/app/_components/layout/AdminMain'
import prisma from '@/prisma/client';
import React from 'react'
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { cache } from 'react';
import UserDetails from './UserDetails';
import { UserWithClients } from '@/app/_types/userTypes';
import UserEditButton from './UserEditButton';

interface Props {
	params: { userId: string }
}


const fetchUser = cache((userId: string) => prisma.user.findUnique({
	where: { id: userId},
	include: {
		selectedClient: true,
		optionalClients: true,
	}
}));

const AdminUserPage = async ({ params }: Props) => {

	const session = await getServerSession(authOptions)
	const user:UserWithClients = await fetchUser(params.userId) as UserWithClients;

	

	if(!user)
		notFound();

	return (
		<AdminMain>
			<Grid columns={{ initial: "1", sm: "6"}} gap="5" >
				<Box className='md:col-span-5'>
					<UserDetails user={user} />
				</Box>	
				{session && (<Box>
					<Flex direction='column' gap="3">
						<UserEditButton userId={user.id} />
					</Flex>
				</Box>)}
			</Grid>
			
		</AdminMain>
		
	)
}

export default AdminUserPage