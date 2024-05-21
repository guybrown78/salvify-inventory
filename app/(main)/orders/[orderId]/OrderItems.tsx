import { NoDataMessage } from "@/app/_components";
import { OrderWithItems } from "@/app/_types/types";
import prisma from "@/prisma/client";
import { Card, Flex, Heading } from "@radix-ui/themes";
import OrderItem from "./OrderItem";
import OrderItemsSelect from "./OrderItemsSelect";

const OrderItems = async ({ order }: { order: OrderWithItems }) => {
	// get items in the client
	const items = await prisma.item.findMany({
		where: { clientId: order.clientId },
	});

	return (
		<Flex direction="column" gap="3">
			<Flex direction="column" gap="3">
				<Heading size="4">Items</Heading>
				<OrderItemsSelect
					order={order}
					clientId={order.clientId}
					items={items}
				/>
			</Flex>

			{!order.orderItems.length && (
				<Card className="max-w-full" mt="4">
					<NoDataMessage>There are no Items in this order</NoDataMessage>
				</Card>
			)}
			{order.orderItems.map((orderItem) => (
				<OrderItem
					key={orderItem.id}
					orderId={order.id}
					orderItem={orderItem}
				/>
			))}
		</Flex>
	);
};

export default OrderItems;
