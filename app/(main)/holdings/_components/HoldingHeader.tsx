import PageHeaderBannerWrapper from "@/app/_components/PageHeaderBannerWrapper";
import { Flex, Heading, Text, Grid, Button } from "@radix-ui/themes";
import { HoldingWithLocations } from "../[holdingId]/holdingQuery";
import LabelValueColumn from "@/app/_components/LabelValueColumn";
import LabelValueRow from "@/app/_components/LabelValueRow";
import Link from "next/link";
import { Pencil2Icon } from "@radix-ui/react-icons";

import { 
	BiSolidPlusCircle,
	BiSolidMinusCircle 
} from "react-icons/bi";
import { 
	TbCircleArrowDownFilled,
	TbAlertCircleFilled
} from "react-icons/tb";


interface Props {
	holding: HoldingWithLocations;
}

const HoldingHeader = ({ holding }: Props) => {
	return (
		<PageHeaderBannerWrapper>
			<Grid
				columns={{ initial: "1", md: "2" }}
				gap={{ initial: "2", md: "5" }}
				py="6"
			>

				<Flex direction="column">
					<Heading as="h1" size="5" weight="bold">
						{holding.title || "Untitled"}
					</Heading>
					<Text size="2" color="gray">
						{holding.field || ""}
					</Text>
					<Flex py="2" gap="3">
						<LabelValueRow label="Type:">
							{holding.type}
						</LabelValueRow>
						<LabelValueRow label="Locations:">
							{holding.locations.length}
						</LabelValueRow>
						{/* <LabelValueRow label="Stock Items:">
							-
						</LabelValueRow> */}
					</Flex>
				</Flex>

				<Flex
					direction={{ initial: "column-reverse", md: "column" }}
					justify="between"
					align={{ initial: "start", md: "end" }}
				>
					<Flex gap="3" align="center" justify="end">

						<Link href={`/holdings/${holding.id}/removed-items`}>
							<Button variant="outline">
								<BiSolidPlusCircle /> Remove Items
							</Button>
						</Link>		

						{
							holding.canAddIncidents && (
								<Link href={`/holdings/${holding.id}/add`}>
									<Button variant="solid">
										<BiSolidPlusCircle /> Add Instances
									</Button>
								</Link>		
							)
						}
					</Flex>
					
				</Flex>
			</Grid>
			
		</PageHeaderBannerWrapper>
	);
};

export default HoldingHeader;
