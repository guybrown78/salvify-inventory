-- AlterTable
ALTER TABLE `Instance` ADD COLUMN `addedById` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `HoldingItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `requiredMinCount` INTEGER NOT NULL,
    `itemId` INTEGER NOT NULL,
    `holdingId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RemoveInstance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prf` VARCHAR(191) NULL,
    `instanceId` INTEGER NOT NULL,
    `holdingId` INTEGER NOT NULL,
    `locationId` INTEGER NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `quantity` INTEGER NOT NULL,
    `removedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `reason` ENUM('USED', 'DAMAGED', 'LOST', 'STOLEN', 'EXPIRED', 'RECALLED', 'REMOVED', 'OTHER') NOT NULL,
    `otherReason` VARCHAR(255) NULL,
    `removedById` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `RemoveInstance_instanceId_key`(`instanceId`),
    UNIQUE INDEX `RemoveInstance_holdingId_key`(`holdingId`),
    UNIQUE INDEX `RemoveInstance_locationId_key`(`locationId`),
    UNIQUE INDEX `RemoveInstance_removedById_key`(`removedById`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
