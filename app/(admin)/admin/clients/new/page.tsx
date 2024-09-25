import React from 'react'
import AdminMain from '@/app/_components/layout/AdminMain'
import ClientFormSkeleton from '../_components/ClientFormSkeleton'
import dynamic from "next/dynamic";

const ClientForm = dynamic(() => import("../_components/ClientForm"), {
	ssr: false,
	loading: () => <ClientFormSkeleton />
});

const NewClientPage = () => {
	return (
		<AdminMain>
			<ClientForm />
		</AdminMain>
	)
}

export default NewClientPage