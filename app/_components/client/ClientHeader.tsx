import { getSessionUser } from "@/app/_utils/getSessionUser";
import { Flex, Heading, Text } from "@radix-ui/themes";
import moment from "moment";
import NoDataMessage from "../NoDataMessage";
import PageHeaderBannerWrapper from "../PageHeaderBannerWrapper";

const greeting = () => {
	const currentHour = Number(moment().format("HH"));
	if (currentHour >= 3 && currentHour < 12) {
		return "Good Morning";
	} else if (currentHour >= 12 && currentHour < 15) {
		return "Good Afternoon";
	} else if (currentHour >= 15 && currentHour < 20) {
		return "Good Evening";
	} else if (currentHour >= 20 && currentHour < 3) {
		return "Good Night";
	} else {
		return "Hello";
	}
};

const ClientHeader = async () => {
	const sessionUser = await getSessionUser();

	// Check if sessionUser is null or undefined
	if (!sessionUser) {
		// Handle the case where sessionUser is not available
		return (
			<PageHeaderBannerWrapper>
				<Flex justify="between" py="6">
					<NoDataMessage>Session user data is not available</NoDataMessage>
				</Flex>
			</PageHeaderBannerWrapper>
		);
	}

	const greetingMsg = greeting();

	return (
		<PageHeaderBannerWrapper>
			<Flex justify="between" py="6">
				<Flex direction="column">
					<Heading as="h1" size="5" weight="bold">
						{greetingMsg}, {sessionUser!.firstname}
					</Heading>
					<Text size="2" color="gray">
						{sessionUser!.clientName!}
					</Text>
				</Flex>
			</Flex>
		</PageHeaderBannerWrapper>
	);
};

export default ClientHeader;
