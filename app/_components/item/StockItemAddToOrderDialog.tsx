"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import {
	Dialog,
	DialogActions,
	DialogBody,
	DialogDescription,
	DialogTitle,
} from "@/components/ui/dialog";

import Skeleton from "@/app/_components/Skeleton";
import { OrderWithOrderItems } from "@/app/_types/types";
import { Button as TWButton } from "@/components/ui/button";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { HiCheck } from "react-icons/hi2";
import InstanceExpiryDate from "../InstanceExpiryDate";
import OrderStatusBadge from "../order/OrderStatusBadge";

interface Props {
	title: string;
	itemId: number;
	isOpenExternal?: boolean;
	onCloseExternal?: () => void;
}

const OrderWithItemListItem = ({ order }: { order: OrderWithOrderItems }) => {
	return (
		<li className="py-1">
			<Link
				href={`/orders/${order.id}`}
				className="pointer flex items-center justify-between bg-zinc-50 p-1.5 text-sm"
			>
				<div className="flex items-center text-green-600">
					<HiCheck className="mr-2" />
					<h5 className="underline ">{`Order #${order.orderNumber}`}</h5>
				</div>

				<OrderStatusBadge orderStatus={order.status} />
				<span>
					(Created on) <InstanceExpiryDate expiryDate={order.createdAt} />
				</span>
				<span>{order.orderItems.length} (Items)</span>
			</Link>
		</li>
	);
};
const OpenOrderInputItem = ({
	order,
	onItemSelect,
}: {
	order: OrderWithOrderItems;
	onItemSelect: (id: number) => void;
}) => {
	return (
		<div className="relative flex items-start">
			<div className="flex h-6 items-center">
				<input
					id={`order-${order.id}`}
					name="order-selection"
					type="radio"
					value={order.id}
					className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
					onChange={() => onItemSelect(order.id)}
				/>
			</div>

			<div className="ml-3 text-sm/6">
				<label
					htmlFor={`order-${order.id}`}
					className="font-medium text-gray-900"
				>
					Order #{order.orderNumber}{" "}
					<OrderStatusBadge orderStatus={order.status} />
				</label>
				<p id={`order-${order.id}-description`} className="text-gray-500">
					(Created on{" "}
					<InstanceExpiryDate expiryDate={String(order.createdAt)} />) -{" "}
					{order.orderItems?.length} Items
				</p>
			</div>
		</div>
	);
};
const NewOrderInputItem = ({ onItemSelect }: { onItemSelect: () => void }) => {
	return (
		<div className="flex items-center">
			<input
				id="order-new"
				name="order-selection"
				type="radio"
				value="new"
				className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
				onChange={() => onItemSelect()}
			/>
			<label
				htmlFor="order-new"
				className="ml-3 block text-sm font-medium text-gray-900"
			>
				Create a New Order
			</label>
		</div>
	);
};
const StockItemAddToOrderDialog = ({
	itemId,
	title,
	isOpenExternal,
	onCloseExternal,
}: Props) => {
	let [isLoading, setIsLoading] = useState(false);
	let [isSubmitting, setIsSubmitting] = useState(false);
	let [isOpen, setIsOpen] = useState(false);
	let [ordersWithItem, setOrdersWithItem] = useState<OrderWithOrderItems[]>([]);
	let [openOrders, setOpenOrders] = useState<OrderWithOrderItems[]>([]);
	const [selectedOrder, setSelectedOrder] = useState<number | "new" | null>(
		null
	);

	// Sync the internal state with the external prop
	useEffect(() => {
		if (typeof isOpenExternal === "boolean") {
			setIsOpen(isOpenExternal);
		}
	}, [isOpenExternal]);

	const handleClose = () => {
		setIsOpen(false);
		setSelectedOrder(null);
		if (onCloseExternal) {
			onCloseExternal();
		}
	};

	const handleAddToOrder = () => {
		setIsSubmitting(true)
		if (selectedOrder === "new") {
			axios
				.post(`/api/orders`, {})
				.then((response) => {
					// new order created, add item to new order
					const newOrderId = response.data.id;
					const newOrderNum = response.data.orderNumber;
					addToOrderAPI({ orderId: newOrderId, orderNum: newOrderNum });
				})
				.catch((error) => {
					console.error("Error creating new order:", error);
					toast.error(`There was an error creating the new order`, {
						id: "createNewOrderErrorToast",
						duration: 3500,
						position: "bottom-right",
					});
					setIsSubmitting(false)
				});
		} else {
			const selectedOpenOrder = openOrders.find(
				(order) => order.id === selectedOrder
			);
			if (selectedOpenOrder) {
				addToOrderAPI({
					orderId: selectedOpenOrder.id,
					orderNum: selectedOpenOrder.orderNumber,
				});
			}
		}
	};

	const addToOrderAPI = ({ orderId, orderNum }:{ orderId:number, orderNum:number}) => {
		axios
			.post(`/api/orders/${orderId}/item`, {
				itemId: itemId,
				quantity: "1",
			})
			.then((response) => {
				// set toast
				toast.success(`${title} has been added to Order #${orderNum}`, {
					id: "addItemToOrderToast",
					duration: 3500,
					position: "bottom-right",
				});
			})
			.catch((error) => {
				console.error("Error adding item to order:", error);
				toast.error(
					`There was an error adding ${title} to Order #${orderNum}`,
					{
						id: "addItemToOrderErrorToast",
						duration: 3500,
						position: "bottom-right",
					}
				);
			}).finally(() => {
				setIsSubmitting(false);
				handleClose();
			});
	};

	useEffect(() => {
		if (isOpen) {
			setIsLoading(true);
			axios
				.get(`/api/items/${itemId}/orders?statuses=OPEN,ORDERED`)
				.then((response) => {
					setOrdersWithItem(response.data);
					if (response.data.length === 0) {
						// If no orders with the item, fetch all open orders
						axios
							.get(`/api/orders?status=OPEN`)
							.then((openOrdersResponse) => {
								setOpenOrders(openOrdersResponse.data);
							})
							.catch((error) => {
								console.error("Error fetching open orders:", error);
							});
					}
				})
				.catch((error) => {
					console.error("Error fetching orders with item:", error);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, [isOpen, itemId]);

	const handleCreateOrder = () => {
		// Create a new order
		axios
			.post(`/api/orders`, {})
			.then((response) => {
				// Optionally navigate to the new order page or update the list of open orders
				setOpenOrders([...openOrders, response.data]);
			})
			.catch((error) => {
				console.error("Error creating new order:", error);
			});
	};

	if (isLoading) {
		return (
			<Dialog size="xl" open={isOpen} onClose={setIsOpen}>
				<DialogTitle>Add to Order</DialogTitle>
				<DialogDescription>Checking existings orders</DialogDescription>
				<DialogBody>
					<div className="max-h-96 overflow-auto text-gray-800">
						<Skeleton height="1rem" width="100%" />
						<Skeleton height="1rem" width="100%" />
					</div>
				</DialogBody>
			</Dialog>
		);
	}
	return (
		<>
			<Dialog size="xl" open={isOpen} onClose={setIsOpen}>
				<DialogTitle>Add to Order</DialogTitle>
				<DialogDescription>
					{ordersWithItem.length > 0
						? `${title} is included in an existing order${
								ordersWithItem.length > 1 ? "s" : ""
						  }.`
						: `Select an order to add ${title}. You can add it to an existing 'OPEN' order or create a new order.`}
				</DialogDescription>
				<DialogBody>
					<div className="max-h-96 overflow-auto text-gray-800">
						{ordersWithItem.length > 0 ? (
							<>
								<h3>Existing Orders with {title}:</h3>
								<ul>
									{ordersWithItem.map((order) => (
										<OrderWithItemListItem key={order.id} order={order} />
									))}
								</ul>
							</>
						) : openOrders.length > 0 ? (
							<fieldset>
								<legend className="text-sm/6 font-semibold text-gray-900">
									Select an Order or Create a New Order
								</legend>
								<div className="mt-6 space-y-6">
									{openOrders.map((order) => (
										<OpenOrderInputItem
											key={order.id}
											order={order}
											onItemSelect={(id) => setSelectedOrder(id)}
										/>
									))}

									<NewOrderInputItem
										onItemSelect={() => setSelectedOrder("new")}
									/>
								</div>
							</fieldset>
						) : (
							<fieldset>
								<legend className="text-sm/6 font-semibold text-gray-900">
									No OPEN orders available. Create a new order to add {title}
								</legend>
								<div className="mt-6 space-y-6">
									<NewOrderInputItem
										onItemSelect={() => setSelectedOrder("new")}
									/>
								</div>
							</fieldset>
						)}
					</div>
				</DialogBody>
				<DialogActions>
					<TWButton outline onClick={() => handleClose()}>
						Cancel
					</TWButton>
					<TWButton
						color="green"
						onClick={() => handleAddToOrder()}
						disabled={
							ordersWithItem?.length ? true : !selectedOrder ? true : false
						}
					>
						{`Add${isSubmitting ? 'ing' : ''} to ${selectedOrder === "new" ? "a New" : ""} Order ${
							selectedOrder !== "new" && selectedOrder
								? `#${
										openOrders.filter((order) => order.id === selectedOrder)[0]
											.orderNumber
								  }`
								: ""
						}`}
					</TWButton>
				</DialogActions>
			</Dialog>
			<Toaster />
		</>
	);
};

export default StockItemAddToOrderDialog;
