import { NoDataMessage } from "@/app/_components";
import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import OrderFormSkeleton from "../../_components/OrderFormSkeleton";

interface Props {
	params: { orderId: string };
}

const OrderForm = dynamic(() => import("../../_components/OrderForm"), {
	ssr: false,
	loading: () => <OrderFormSkeleton />,
});

const EditOrderPage = async ({ params }: Props) => {
	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		// Handle the case where session.user is not available
		return (
			<Flex direction="column" gap="3">
				<NoDataMessage>Session user data is not available</NoDataMessage>
			</Flex>
		);
	}

	const order = await prisma.order.findUnique({
		where: {
			id: parseInt(params.orderId),
			clientId: session.user.clientId!,
		},
		include: {
			orderItems: true,
		},
	});

	if (!order) notFound();

	return <OrderForm order={order} nextOrderNumber={order.orderNumber} />;
};

export default EditOrderPage;
