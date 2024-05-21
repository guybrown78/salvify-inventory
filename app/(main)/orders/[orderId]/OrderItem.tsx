"use client";
import {
	FieldErrorMessage,
	Spinner,
	StockItemCategoryBadge,
	StockItemGroupingBadge,
	StockItemTypeBadge,
} from "@/app/_components";
import { OrderItemWithItem } from "@/app/_types/types";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button, Card, Flex, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useState } from "react";
import debounce from "lodash/debounce";
// import throttle from "lodash/throttle";


interface Props {
	orderId: number;
	orderItem: OrderItemWithItem;
}

const OrderItem = ({ orderId, orderItem }: Props) => {
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const router = useRouter();

	const onRemove = async () => {
		try {
			setIsDeleting(true);
			await axios.delete(`/api/orders/${orderId}/item/${orderItem.id}`);
			router.refresh();
		} catch (error) {
			setIsDeleting(false);
			setError("An unexpected error occured");
		}
	};

	const onQuantityChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
		const quantity:number = parseInt(e.target.value);
		if(quantity > 0){
			setError("")
			console.log("Changed value:", quantity);
			try {
				setIsSubmitting(true);
				await axios.patch(`/api/orders/${orderId}/item/${orderItem.id}`,{quantity});
				setIsSubmitting(false);
			} catch (error) {
				setIsSubmitting(false);
				setError("Sorry, we could not update the quantity");
			}
		}else{
			setError("Quantity can not be set to 0 or below")
		}
  };

	// const throttledOnQuantityChange = throttle(onQuantityChange, 500);
	const debouncedOnQuantityChange = debounce(onQuantityChange, 500);	
	

	return (
		<Card className="max-w-full" mt="4">
			<Flex
				direction="column"
				gap="2"
				className={classNames(isDeleting ? "opacity-55" : "")}
			>
				<Text size="2">{orderItem.item.title}</Text>
				<Flex gap="1">
					<StockItemTypeBadge itemType={orderItem.item.type} />
					<StockItemCategoryBadge itemCategory={orderItem.item.category} />
					<StockItemGroupingBadge itemGrouping={orderItem.item.grouping} />
				</Flex>
				<Flex align="end" justify="between">
					<Flex align="center" gap="2">
						<Text size="2">Quantity</Text>
						<TextField.Root>
							<TextField.Input
								type="number"
								min={1}
								defaultValue={orderItem.quantity}
								onChange={debouncedOnQuantityChange}
								disabled={isSubmitting}
							/>
						</TextField.Root>
						
					</Flex>
					<Button
						variant="ghost"
						color="red"
						type="button"
						disabled={isSubmitting || isDeleting}
						onClick={onRemove}
					>
						<TrashIcon />
						{isDeleting ? "Removing from Order" : "Remove from Order"}{" "}
						{isDeleting && <Spinner />}
					</Button>
				</Flex>
				<FieldErrorMessage>{error}</FieldErrorMessage>
			</Flex>
		</Card>
	);
};

export default OrderItem;
