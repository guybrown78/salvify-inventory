import prisma from "@/prisma/client";
import { ItemWithInstancesHoldingItems } from "@/app/_types/types";

class ExpiringItemsService {
  static async getHoldingExpiringItems(holdingId: number, dayOffsetCount: number = 30): Promise<ItemWithInstancesHoldingItems[]> {
    const now = new Date();
    const dayOffset = new Date();
    dayOffset.setDate(now.getDate() + dayOffsetCount);

    const expiringItems: ItemWithInstancesHoldingItems[] = await prisma.item.findMany({
      where: {
        instances: {
          some: {
            expiryDate: {
              gte: now,
              lte: dayOffset,
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
}

export default ExpiringItemsService;