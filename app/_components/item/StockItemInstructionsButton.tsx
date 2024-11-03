"use client";

import ButtonGroupItem from "@/app/_components/ui/buttons/ButtonGroupItem";
import { HiOutlineDocumentText } from "react-icons/hi2";

interface Props {
	title: string;
	instructionsURL: string | null;
	rounding?: "left" | "right" | "both" | "none";
}
const StockItemInstructionsButton = ({
	instructionsURL,
	title,
	rounding,
}: Props) => {
	if (!instructionsURL || instructionsURL === "" || instructionsURL === " ") {
		return null;
	}
	return (
		<ButtonGroupItem
			title="Instructions"
			icon={<HiOutlineDocumentText />}
			href={instructionsURL}
			rounding={rounding}
		/>
	);
};

export default StockItemInstructionsButton;
