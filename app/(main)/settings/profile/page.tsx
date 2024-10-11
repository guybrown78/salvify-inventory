import { Flex, Heading } from "@radix-ui/themes";
import ChangePassword from "../_components/ChangePassword";
import Logout from "../_components/Logout";
import UpdateDetails from "../_components/UpdateDetails";
import SwitchClient from "../_components/SwitchClient";
import { getSessionUser } from "@/app/_utils/getSessionUser";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

const SettingsProfilePage = async () => {

	const sessionUser = await getSessionUser();
	

	if(!sessionUser)
			notFound()

	const clients = sessionUser.optionalClients?.length ? await prisma.client.findMany() : []


	return (
		<Flex direction="column" gap="3">
			<Heading>User Profile</Heading>
			<div className="divide-y divide-white/5">
				<UpdateDetails sessionUser={sessionUser} />
				<ChangePassword sessionUser={sessionUser} />
				<SwitchClient sessionUser={sessionUser} clients={clients} />
				<Logout />
			</div>
		</Flex>
	);
};

export default SettingsProfilePage;
