"use client";

import ButtonGroupItem from "@/app/_components/ui/buttons/ButtonGroupItem";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { AlertDialog, Box, Button, Flex } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import "./dialog-information-scroll.css";
interface Props {
	title: string;
	information: string | null;
	rounding?: "left" | "right" | "both" | "none";
}

const StockItemInformationButton = ({
	information,
	title,
	rounding,
}: Props) => {
	//
	if (!information || information.trim() === "") {
		return null;
	}
	//
	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger>
				<ButtonGroupItem
					title="Information"
					icon={<InfoCircledIcon />}
					rounding={rounding}
				/>
			</AlertDialog.Trigger>
			<AlertDialog.Content>
				<AlertDialog.Title>{title}</AlertDialog.Title>

				<AlertDialog.Description>
					<Box className="scrollable-content prose max-w-full">
						<ReactMarkdown>{information}</ReactMarkdown>
					</Box>
				</AlertDialog.Description>

				<Flex className="mt-4" gap="3" justify="end">
					<AlertDialog.Cancel>
						<Button color="gray" variant="soft">
							Close
						</Button>
					</AlertDialog.Cancel>
				</Flex>
			</AlertDialog.Content>
		</AlertDialog.Root>
	);
};

export default StockItemInformationButton;
