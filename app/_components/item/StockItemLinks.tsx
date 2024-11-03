import ButtonGroup from "@/app/_components/ui/buttons/ButtonGroup";
import { Item } from "@prisma/client";
import StockItemEMCButton from "./StockItemEMCButton";
import StockItemInformationButton from "./StockItemInformationButton";
import StockItemInstructionsButton from "./StockItemInstructionsButton";


const StockItemLinks = ({ item }: { item: Item }) => {
	const infoRounding = item.instructionsURL || item.emcId ? "left" : "both";
	const instructionsRounding =
		item.information && item.emcId
			? "none"
			: !item.information && item.emcId
			? "left"
			: item.information && !item.emcId
			? "right"
			: "both";
	const emcRounding =
		item.instructionsURL || item.information ? "right" : "both";

	return (
		<ButtonGroup>
			<StockItemInformationButton
				information={item.information}
				title={item.title}
				rounding={infoRounding}
			/>
			<StockItemInstructionsButton
				title={item.title}
				instructionsURL={item.instructionsURL}
				rounding={instructionsRounding}
			/>
			<StockItemEMCButton
				title={item.title}
				emcId={item.emcId}
				rounding={emcRounding}
			/>
		</ButtonGroup>
	);
};

export default StockItemLinks;
