/*
  Warnings:

  - You are about to drop the `_OptionalClients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_OptionalClients` DROP FOREIGN KEY `_OptionalClients_A_fkey`;

-- DropForeignKey
ALTER TABLE `_OptionalClients` DROP FOREIGN KEY `_OptionalClients_B_fkey`;

-- AlterTable
ALTER TABLE `Item` MODIFY `type` ENUM('NONE', 'UNKNOWN', 'TABLET', 'INJECTION', 'SPRAY', 'LIQUID', 'SUPPOSITORY', 'CAPSULE', 'AMPOULE', 'CREAM', 'GEL', 'TOPICAL', 'BUCCAL', 'PREFILLED_SYRINGE', 'SYRINGE', 'DRESSING', 'DROPS', 'PESSARY', 'INHALER', 'GAS', 'SUSPENSION') NULL;

-- DropTable
DROP TABLE `_OptionalClients`;

-- CreateTable
CREATE TABLE `OptionalClient` (
    `userId` VARCHAR(255) NOT NULL,
    `clientId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `clientId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OptionalClient` ADD CONSTRAINT `OptionalClient_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OptionalClient` ADD CONSTRAINT `OptionalClient_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
