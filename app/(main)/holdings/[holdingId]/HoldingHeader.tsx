import PageHeaderBannerWrapper from "@/app/_components/PageHeaderBannerWrapper";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { HoldingWithLocations } from "./holdingQuery";

interface Props {
	holding: HoldingWithLocations;
}

const HoldingHeader = ({ holding }: Props) => {
	return (
		<PageHeaderBannerWrapper>
			<Flex justify="between" py="6">
				<Flex direction="column">
					<Heading as="h1" size="5" weight="bold">
						{holding.title || "Untitled"}
					</Heading>
					<Text size="2" color="gray">
						{holding.field || ""}
					</Text>
				</Flex>
			</Flex>
		</PageHeaderBannerWrapper>
	);
};

export default HoldingHeader;
