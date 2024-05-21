import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import HoldingTypeFilter from "./HoldingTypeFilter";

const HoldingsToolbar = () => {
	return (
		<Flex justify="between" align="center">
			<HoldingTypeFilter />
			<Button>
				<Link href="/holdings/new">New Holding</Link>
			</Button>
		</Flex>
	);
};

export default HoldingsToolbar;
