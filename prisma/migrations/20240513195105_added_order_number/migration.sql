/*
  Warnings:

  - You are about to drop the column `description` on the `Order` table. All the data in the column will be lost.
  - The values [IN_PROGRESS,CLOSE] on the enum `Order_status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `orderNumber` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` DROP COLUMN `description`,
    ADD COLUMN `notes` TEXT NULL,
    ADD COLUMN `orderNumber` INTEGER NOT NULL,
    MODIFY `title` VARCHAR(255) NULL,
    MODIFY `status` ENUM('OPEN', 'ORDERED', 'RECEIVED', 'COMPLETE', 'CLOSED') NOT NULL DEFAULT 'OPEN';

-- AlterTable
ALTER TABLE `OrderItem` ADD COLUMN `addedById` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `OrderItem_addedById_idx` ON `OrderItem`(`addedById`);
