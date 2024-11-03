"use client";

import { Button } from "@radix-ui/themes";
import { useState } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi2";

import StockItemAddToOrderDialog from "./StockItemAddToOrderDialog";

interface Props {
	title: string;
	itemId: number;
}

const StockItemAddToOrderButton = ({ itemId, title }: Props) => {
	let [isOrderOpen, setIsOrderOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setIsOrderOpen(true)}>
				<HiOutlinePlusCircle className="text-xl md:text-lg" />{" "}
				<span className="hidden md:inline-block">Add to Order</span>
			</Button>

			<StockItemAddToOrderDialog
				title={title}
				itemId={itemId}
				isOpenExternal={isOrderOpen}
				onCloseExternal={() => setIsOrderOpen(false)}
			/>
		</>
	);
};

export default StockItemAddToOrderButton;
