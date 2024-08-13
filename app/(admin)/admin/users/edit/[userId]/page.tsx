import AdminMain from "@/app/_components/layout/AdminMain";
import { UserWithClients } from "@/app/_types/userTypes";
import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import UserFormSkeleton from "../../_components/UserFormSkeleton";

const UserForm = dynamic(() => import("../../_components/UserForm"), {
	ssr: false,
	loading: () => <UserFormSkeleton />,
});

interface Props {
	params: { userId: string };
}

const EditUserPage = async ({ params }: Props) => {


	const user: UserWithClients = (await prisma.user.findUnique({
		where: { id: params.userId },
		include: {
			selectedClient: true,
			optionalClients: true,
		},
	})) as UserWithClients;

	const clients = await prisma.client.findMany();

	if (!user) notFound();

	return (
		<AdminMain>
			<UserForm clients={clients} user={user} />
		</AdminMain>
	);
};

export default EditUserPage;
