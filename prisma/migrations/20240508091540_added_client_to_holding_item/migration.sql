/*
  Warnings:

  - Added the required column `clientId` to the `HoldingItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `HoldingItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `HoldingItem` ADD COLUMN `clientId` INTEGER NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `requiredMinCount` INTEGER NULL;

-- CreateIndex
CREATE INDEX `HoldingItem_clientId_idx` ON `HoldingItem`(`clientId`);
