import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import OrderStatusFilter from "./OrderStatusFilter";

const OrderToolbar = () => {
	return (
		<Flex justify="between" align="center">
			<OrderStatusFilter />
			<Button>
				<Link href="/orders/new">New Order</Link>
			</Button>
		</Flex>
	);
};

export default OrderToolbar;
