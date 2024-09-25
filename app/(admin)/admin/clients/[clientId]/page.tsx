import { ClientWithUserItems } from '@/app/_types/clientTypes';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import prisma from '@/prisma/client';
import AdminMain from '@/app/_components/layout/AdminMain'
import { Box, Flex, Grid } from '@radix-ui/themes';
import ClientEditButton from './ClientEditButton';
import ClientDetails from './ClientDetails';


interface Props {
	params: { clientId: string }
}

const fetchClient = cache((clientId: number) => prisma.client.findUnique({
	where: { id: clientId},
	include: {
		users: true,
		items: true,
	}
}));

const AdminClientPage = async ({ params }: Props) => {

	const client:ClientWithUserItems = await fetchClient(parseInt(params.clientId)) as ClientWithUserItems;

	if(!client)
			notFound();


	return (
		<AdminMain>
			<Grid columns={{ initial: "1", sm: "5"}} gap="5" >
		 		<Box className='md:col-span-4'>
					<ClientDetails client={client} />
				</Box>
				<Flex direction="column" gap="3">
					<ClientEditButton clientId={client.id} />
				</Flex>
			</Grid>
		</AdminMain>
		
	)
}

export default AdminClientPage