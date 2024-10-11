import { ItemWithInstancesHoldingItems } from "@/app/_types/types";
import prisma from "@/prisma/client";

class ExpiringItemsService {
	static async getHoldingExpiringItems(
		holdingId: number,
		dayOffsetCount: number = 30
	): Promise<ItemWithInstancesHoldingItems[]> {
		const now = new Date();
		const dayOffset = new Date();
		dayOffset.setDate(now.getDate() + dayOffsetCount);

		const expiringItems: ItemWithInstancesHoldingItems[] =
			await prisma.item.findMany({
				where: {
					instances: {
						some: {
							expiryDate: {
								gte: now,
								lte: dayOffset,
							},
							quantity: {
								gt: 0, // Ensure the instance has quantity greater than zero
							},
							location: {
								holdingId: holdingId,
							},
						},
					},
				},
				include: {
					instances: {
						where: {
							expiryDate: {
								gte: now,
								lte: dayOffset,
							},
							quantity: {
								gt: 0, // Ensure the instance has quantity greater than zero
							},
							location: {
								holdingId: holdingId,
							},
						},
						include: {
							location: true,
						},
					},
				},
			});

		return expiringItems;
	}

	// New method to get expired items
	static async getHoldingExpiredItems(
		holdingId: number
	): Promise<ItemWithInstancesHoldingItems[]> {
		const now = new Date();

		const expiredItems: ItemWithInstancesHoldingItems[] =
			await prisma.item.findMany({
				where: {
					instances: {
						some: {
							expiryDate: {
								lt: now, // Expiration date is in the past
							},
							quantity: {
								gt: 0, // Ensure the instance has quantity greater than zero
							},
							location: {
								holdingId: holdingId, // Match the holding ID
							},
						},
					},
				},
				include: {
					instances: {
						where: {
							expiryDate: {
								lt: now, // Expiration date is in the past
							},
							quantity: {
								gt: 0, // Only include instances with quantity greater than zero
							},
							location: {
								holdingId: holdingId, // Ensure the instance is related to the correct holding
							},
						},
						include: {
              location: {
                include: {
                  holding: true, // Ensure the holding relation is included
                },
              },
            },
					},
				},
			});

		return expiredItems;
	}
}

export default ExpiringItemsService;
