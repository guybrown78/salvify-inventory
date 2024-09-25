import ClientFormSkeleton from '../../_components/ClientFormSkeleton'
import AdminMain from "@/app/_components/layout/AdminMain";

const ClientFormEditLoadingPage = () => {
	return (
		<AdminMain>
			<ClientFormSkeleton />
		</AdminMain>
	)
}

export default ClientFormEditLoadingPage