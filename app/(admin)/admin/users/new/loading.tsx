import UserFormSkeleton from '../_components/UserFormSkeleton'
import AdminMain from "@/app/_components/layout/AdminMain";

const UserFormLoadingPage = () => {
	return (
		<AdminMain>
			<UserFormSkeleton />
		</AdminMain>
	);
};

export default  UserFormLoadingPage