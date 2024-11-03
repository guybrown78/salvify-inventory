"use client";

import { useEffect, useState } from "react";

import {
	Dialog,
	DialogActions,
	DialogBody,
	DialogDescription,
	DialogTitle,
} from "@/components/ui/dialog";

import { Button as TWButton } from "@/components/ui/button";

interface Props {
	title: string;
	itemId: number;
	isOpenExternal?: boolean;
	onCloseExternal?: () => void;
}

const StockItemDeleteDialog = ({
	itemId,
	title,
	isOpenExternal,
	onCloseExternal,
}: Props) => {
	let [isOpen, setIsOpen] = useState(false);

	// Sync the internal state with the external prop
	useEffect(() => {
		if (typeof isOpenExternal === "boolean") {
			setIsOpen(isOpenExternal);
		}
	}, [isOpenExternal]);

	const handleClose = () => {
		setIsOpen(false);
		if (onCloseExternal) {
			onCloseExternal();
		}
	};

	return (
		<Dialog size="xl" open={isOpen} onClose={setIsOpen}>
			<DialogTitle>Delete {title}</DialogTitle>
			<DialogDescription>
				Deleting {title} removes the whole stock item.
			</DialogDescription>
			<DialogBody>
				<p>Body</p>
			</DialogBody>
			<DialogActions>
				<TWButton outline onClick={() => handleClose()}>
					Cancel
				</TWButton>
				<TWButton color="red" onClick={() => handleClose()}>
					Delete
				</TWButton>
			</DialogActions>
		</Dialog>
	);
};

export default StockItemDeleteDialog;
