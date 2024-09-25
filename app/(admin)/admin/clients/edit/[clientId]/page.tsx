import React from 'react'
import AdminMain from '@/app/_components/layout/AdminMain'
import ClientFormSkeleton from '../../_components/ClientFormSkeleton'
import dynamic from "next/dynamic";
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';

const ClientForm = dynamic(() => import("../../_components/ClientForm"), {
	ssr: false,
	loading: () => <ClientFormSkeleton />
});


interface Props {
	params: { clientId: string };
}


const AdminEditClientPage = async ({ params }: Props) => {

	const client = await prisma.client?.findUnique({
		where: { id: parseInt(params.clientId)},
		include: {
			users: true,
			items: true
		}
	})

	if(!client) notFound();
	
	return (
		<AdminMain>
			<ClientForm client={client} />
		</AdminMain>
	)
}

export default AdminEditClientPage