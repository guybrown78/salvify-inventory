import LabelValueRow from "@/app/_components/LabelValueRow";
import { getSessionUser } from "@/app/_utils/getSessionUser";
import { Button, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import moment from "moment";
import Link from "next/link";
import {
	HiOutlineShoppingCart
} from "react-icons/hi2";
import NoDataMessage from "../NoDataMessage";
import PageHeaderBannerWrapper from "../PageHeaderBannerWrapper";
import prisma from "@/prisma/client";
import { OrderStatus } from "@prisma/client";
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

interface Props {
	holdingsCount:number
}


const ClientHeader = async ({ holdingsCount }:Props) => {
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

	const items = await prisma.item?.findMany({
    where:{
			clientId: sessionUser!.clientId!
		}
  });

	const openOrders = await prisma.order?.findMany({
		where:{
			status: OrderStatus.OPEN,
			clientId: sessionUser!.clientId!
		}
	})

	const greetingMsg = greeting();

	return (
		<PageHeaderBannerWrapper>
			<Grid
				columns={{ initial: "1", md: "2" }}
				gap={{ initial: "2", md: "5" }}
				py="6"
			>
				<Flex direction="column">
					<Heading as="h1" size="5" weight="bold">
						{greetingMsg}, {sessionUser!.firstname}
					</Heading>
					<Text size="2" color="gray">
						{sessionUser!.clientName!}
					</Text>

					<Flex py="2" gap="3">
						<LabelValueRow label="Holdings:">
							{ holdingsCount }
						</LabelValueRow>
						<LabelValueRow label="Stock Items">
							{ items.length }
						</LabelValueRow>
						{/* <LabelValueRow label="Stock Instances:">
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

						{
							openOrders.length >= 1 && (
								<Link href="/orders/list?status=OPEN">
									<Button variant="outline">
										<HiOutlineShoppingCart /> Open Orders ({ openOrders.length })
									</Button>
								</Link>		
							)
						}

						{
							!openOrders.length && (
								<Link href="/orders/new">
									<Button variant="solid">
										<HiOutlineShoppingCart /> Start a new order
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

export default ClientHeader;
