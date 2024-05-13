/*
  Warnings:

  - You are about to drop the column `clientId` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `OrderItem_clientId_idx` ON `OrderItem`;

-- AlterTable
ALTER TABLE `OrderItem` DROP COLUMN `clientId`,
    ADD COLUMN `orderId` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `OrderItem_orderId_idx` ON `OrderItem`(`orderId`);
