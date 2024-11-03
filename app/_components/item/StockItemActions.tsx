"use client";

import { Button } from "@radix-ui/themes";
import { useState } from "react";
import {
	HiEllipsisVertical,
	HiOutlinePencil,
	HiOutlinePlusCircle,
	HiOutlineTrash,
} from "react-icons/hi2";



import {
	Dropdown,
	DropdownButton,
	DropdownItem,
	DropdownMenu,
} from "@/components/ui/dropdown";
import StockItemAddToOrderDialog from "./StockItemAddToOrderDialog";
import StockItemDeleteDialog from "./StockItemDeleteDialog";

interface Props {
	title: string;
	itemId: number;
	showEdit?: boolean;
}

const StockItemActions = ({ itemId, title, showEdit }: Props) => {
	let [isOrderOpen, setIsOrderOpen] = useState(false);
	let [isDeleteOpen, setIsDeleteOpen] = useState(false);

	return (
		<>
			<div className="flex items-center justify-end gap-2">
				<div className={showEdit ? "hidden md:inline-block" : ""}>
					<Button onClick={() => setIsOrderOpen(true)}>
						<HiOutlinePlusCircle className="text-xl md:text-lg" />{" "}
						<span className="hidden md:inline-block">Add to Order</span>
					</Button>
				</div>

				{showEdit && (
					<Dropdown>
						<DropdownButton plain className="h-8 *:rounded-md">
							<HiEllipsisVertical />
						</DropdownButton>
						<DropdownMenu>
							<DropdownItem
								onClick={() => setIsOrderOpen(true)}
								className="md:hidden"
							>
								<HiOutlinePlusCircle /> Add to Order
							</DropdownItem>
							<DropdownItem href={`/stock-items/edit/${itemId}`}>
								<HiOutlinePencil /> Edit
							</DropdownItem>
							{/* <DropdownItem onClick={() => setIsDeleteOpen(true)} color="red">
								<HiOutlineTrash /> Delete
							</DropdownItem> */}
						</DropdownMenu>
					</Dropdown>
				)}
			</div>

			<StockItemAddToOrderDialog
				title={title}
				itemId={itemId}
				isOpenExternal={isOrderOpen}
				onCloseExternal={() => setIsOrderOpen(false)}
			/>
			<StockItemDeleteDialog
				title={title}
				itemId={itemId}
				isOpenExternal={isDeleteOpen}
				onCloseExternal={() => setIsDeleteOpen(false)}
			/>
		</>
	);
};

export default StockItemActions;
