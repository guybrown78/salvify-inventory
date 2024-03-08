-- CreateTable
CREATE TABLE `Instance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `expiryDate` DATETIME(3) NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `batch` VARCHAR(255) NULL,
    `itemId` INTEGER NOT NULL,
    `locationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
