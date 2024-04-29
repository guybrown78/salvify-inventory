-- AlterTable
ALTER TABLE `Holding` ADD COLUMN `clientId` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Instance` ADD COLUMN `clientId` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Item` ADD COLUMN `clientId` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Location` ADD COLUMN `clientId` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `RemoveInstance` ADD COLUMN `clientId` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `clientId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Holding_clientId_idx` ON `Holding`(`clientId`);

-- CreateIndex
CREATE INDEX `Instance_clientId_idx` ON `Instance`(`clientId`);

-- CreateIndex
CREATE INDEX `Item_clientId_idx` ON `Item`(`clientId`);

-- CreateIndex
CREATE INDEX `Location_clientId_idx` ON `Location`(`clientId`);

-- CreateIndex
CREATE INDEX `RemoveInstance_clientId_idx` ON `RemoveInstance`(`clientId`);

-- CreateIndex
CREATE INDEX `User_clientId_idx` ON `User`(`clientId`);
