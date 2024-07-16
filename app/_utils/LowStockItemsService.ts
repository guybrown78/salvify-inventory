
import prisma from "@/prisma/client";
import { calculateItemInstanceTotal } from "@/app/_utils/itemInstanceTotalCount";
import { ItemWithInstancesHoldingItems } from "@/app/_types/types";

class LowStockItemsService {
  static async getHoldingLowStockItems(holdingId: number): Promise<ItemWithInstancesHoldingItems[]> {
    const holdingItemQuery: any = {
      holding: {
        id: holdingId,
      },
    };

    const whereClause: any = {
      OR: [
        {
          instances: {
            some: {
              location: {
                holding: {
                  id: holdingId,
                },
              },
            },
          },
        },
        {
          holdingItems: {
            some: holdingItemQuery,
          },
        }
      ],
    };

    const itemsInHoldingAndLocation: ItemWithInstancesHoldingItems[] = await prisma.item.findMany({
      where: whereClause,
      include: {
        instances: {
          where: {
            location: {
              holding: {
                id: holdingId,
              },
            },
          },
          include: {
            location: true,
          },
        },
        holdingItems: {
          where: {
            holding: {
              id: holdingId,
            },
          },
        },
      },
    });

    const lowItems = itemsInHoldingAndLocation.filter(item => {
      const total: number = calculateItemInstanceTotal(item);
      if (item.holdingItems && item.holdingItems.length) {
        const min = item.holdingItems[0].requiredMinCount ?? 0;
        if (total < min) {
          return item;
        }
      }
    });

    return lowItems;
  }
}

export default LowStockItemsService;