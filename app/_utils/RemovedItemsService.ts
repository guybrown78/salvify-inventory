import prisma from "@/prisma/client";
import { RemoveInstanceWithItemLocationUser } from "@/app/_types/types";

class RemovedItemsService {
  static async getHoldingRemovedItems(holdingId: number, dayOffsetCount: number = 30): Promise<RemoveInstanceWithItemLocationUser[]> {
    const now = new Date();
    const dayOffset = new Date();
    dayOffset.setDate(now.getDate() - dayOffsetCount);

		const removedItems = await prisma.removeInstance.findMany({
      where: {
        holdingId: holdingId,
        removedAt: {
          gte: dayOffset,
          lte: now,
        },
      },
      include: {
        instance: {
          include: {
            item: true,
          },
        },
        location: true,
        removedBy: true,
      },
    });
    return removedItems as RemoveInstanceWithItemLocationUser[];
  }
}

export default RemovedItemsService;