import AdminMain from "@/app/_components/layout/AdminMain";
import dynamic from "next/dynamic";
import UserFormSkeleton from "../_components/UserFormSkeleton";
import prisma from "@/prisma/client";

const UserForm = dynamic(() => import("../_components/UserForm"), {
	ssr: false,
	loading: () => <UserFormSkeleton />,
});
const NewUserPage = async () => {

	const clients = await prisma.client.findMany();

	return (
		<AdminMain>
			<UserForm clients={clients} />
		</AdminMain>
	);
};

export default NewUserPage;
