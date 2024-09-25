import ClientFormSkeleton from '../_components/ClientFormSkeleton'
import AdminMain from "@/app/_components/layout/AdminMain";

const ClientFormLoadingPage = () => {
	return (
		<AdminMain>
			<ClientFormSkeleton />
		</AdminMain>
	)
}

export default ClientFormLoadingPage