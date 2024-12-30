import { NoDataMessage } from "@/app/_components";
import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import OrderFormSkeleton from "../_components/OrderFormSkeleton";

const OrderForm = dynamic(() => import("../_components/OrderForm"), {
	ssr: false,
	loading: () => <OrderFormSkeleton />,
});

const NewOrderPage = async () => {
	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		// Handle the case where session.user is not available
		return (
			<Flex direction="column" gap="3">
				<NoDataMessage>Session user data is not available</NoDataMessage>
			</Flex>
		);
	}

	const latestOrder = await prisma.order.findFirst({
		where: { clientId: session.user.clientId! },
		orderBy: { orderNumber: "desc" },
	});

	// Calculate the next orderNumber
	const nextOrderNumber = latestOrder ? latestOrder.orderNumber + 1 : 1;

	return <OrderForm nextOrderNumber={nextOrderNumber} />;
};

export default NewOrderPage;
