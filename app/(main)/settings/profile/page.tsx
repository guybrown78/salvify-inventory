import { Flex, Heading } from "@radix-ui/themes";
import ChangePassword from "../_components/ChangePassword";
import Logout from "../_components/Logout";
import SwitchClient from "../_components/SwitchClient";
import UpdateDetails from "../_components/UpdateDetails";

import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const SettingsProfilePage = async () => {
	const session = await getServerSession(authOptions);

	if (!session) notFound();

	const clients = session.user.optionalClients?.length
		? await prisma.client.findMany()
		: [];

	return (
		<Flex direction="column" gap="3">
			<Heading>User Profile</Heading>
			<div className="divide-y divide-white/5">
				<UpdateDetails sessionUser={session.user} />
				<ChangePassword sessionUser={session.user} />
				<SwitchClient sessionUser={session.user} clients={clients} />
				<Logout />
			</div>
		</Flex>
	);
};

export default SettingsProfilePage;
