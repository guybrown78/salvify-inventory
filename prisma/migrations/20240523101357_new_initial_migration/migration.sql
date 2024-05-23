-- CreateTable
CREATE TABLE `Issue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `status` ENUM('OPEN', 'IN_PROGRESS', 'CLOSE') NOT NULL DEFAULT 'OPEN',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `assignedToUserId` VARCHAR(255) NULL,

    INDEX `Issue_assignedToUserId_idx`(`assignedToUserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    INDEX `Account_userId_idx`(`userId`),
    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    INDEX `Session_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(191) NULL,
    `surname` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `hashedPassword` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `role` ENUM('USER', 'ADMIN', 'SUPERADMIN') NOT NULL DEFAULT 'USER',
    `clientId` INTEGER NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    INDEX `User_clientId_idx`(`clientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `type` ENUM('NONE', 'UNKNOWN', 'TABLET', 'INJECTION', 'SPRAY', 'LIQUID', 'SUPPOSITORY', 'CAPSULE', 'AMPOULE', 'CREAM', 'GEL', 'TOPICAL', 'BUCCAL', 'PREFILLED_SYRINGE', 'SYRINGE', 'DRESSING', 'DROPS', 'PESSARY', 'INHALER') NULL,
    `category` ENUM('NONE', 'UNKNOWN', 'DRUG', 'DRESSING', 'DISPOSABLE', 'BEDDING', 'SPLINT', 'STRETCHER', 'HARDWARE') NULL,
    `grouping` ENUM('NONE', 'UNKNOWN', 'CARDIOVASCULAR', 'GASTROINTESTINAL', 'ANALGESICS_ANTISPASMODICS', 'NERVOUS', 'ALLERGY_ANAPHYLAXSIS', 'RESPIRATORY', 'ANTIINFECTION', 'REHYDRATION', 'EXTERNAL', 'RESUSCITATION', 'DRESSING', 'INSTRUMENTS', 'MONITORING', 'INJECTION_CATHETERIZATION', 'GENERAL', 'IMMOBILIZATION', 'ADDITIONAL') NULL,
    `requiredCount` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `information` TEXT NULL,
    `instructionsURL` VARCHAR(191) NULL,
    `bnfSlug` VARCHAR(191) NULL,
    `emcId` VARCHAR(191) NULL,
    `clientId` INTEGER NOT NULL DEFAULT 0,

    INDEX `Item_clientId_idx`(`clientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Holding` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `field` VARCHAR(255) NULL,
    `isMainHolding` BOOLEAN NOT NULL DEFAULT false,
    `canAddIncidents` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `type` ENUM('EVENT', 'FLEET', 'FACILITY', 'STORE', 'GENERAL') NOT NULL DEFAULT 'GENERAL',
    `clientId` INTEGER NOT NULL DEFAULT 0,

    INDEX `Holding_clientId_idx`(`clientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `field` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `holdingId` INTEGER NOT NULL,
    `clientId` INTEGER NOT NULL DEFAULT 0,

    INDEX `Location_clientId_idx`(`clientId`),
    INDEX `Location_holdingId_idx`(`holdingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Instance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `expiryDate` DATETIME(3) NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `batch` VARCHAR(255) NULL,
    `previousInstanceId` INTEGER NULL,
    `itemId` INTEGER NOT NULL,
    `locationId` INTEGER NOT NULL,
    `addedById` VARCHAR(191) NULL,
    `clientId` INTEGER NOT NULL DEFAULT 0,

    INDEX `Instance_clientId_idx`(`clientId`),
    INDEX `Instance_addedById_idx`(`addedById`),
    INDEX `Instance_itemId_idx`(`itemId`),
    INDEX `Instance_locationId_idx`(`locationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HoldingItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `requiredMinCount` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `itemId` INTEGER NOT NULL,
    `holdingId` INTEGER NOT NULL,
    `clientId` INTEGER NOT NULL,

    INDEX `HoldingItem_itemId_idx`(`itemId`),
    INDEX `HoldingItem_holdingId_idx`(`holdingId`),
    INDEX `HoldingItem_clientId_idx`(`clientId`),
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
    `clientId` INTEGER NOT NULL DEFAULT 0,

    INDEX `RemoveInstance_clientId_idx`(`clientId`),
    INDEX `RemoveInstance_instanceId_idx`(`instanceId`),
    INDEX `RemoveInstance_holdingId_idx`(`holdingId`),
    INDEX `RemoveInstance_locationId_idx`(`locationId`),
    INDEX `RemoveInstance_removedById_idx`(`removedById`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderNumber` INTEGER NOT NULL,
    `title` VARCHAR(255) NULL,
    `notes` TEXT NULL,
    `status` ENUM('OPEN', 'ORDERED', 'RECEIVED', 'COMPLETE', 'CLOSED') NOT NULL DEFAULT 'OPEN',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `assignedToUserId` VARCHAR(255) NULL,
    `clientId` INTEGER NOT NULL,

    INDEX `Order_clientId_idx`(`clientId`),
    INDEX `Order_assignedToUserId_idx`(`assignedToUserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `itemId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `orderId` INTEGER NOT NULL,
    `addedById` VARCHAR(191) NULL,

    INDEX `OrderItem_itemId_idx`(`itemId`),
    INDEX `OrderItem_orderId_idx`(`orderId`),
    INDEX `OrderItem_addedById_idx`(`addedById`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_OptionalClients` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_OptionalClients_AB_unique`(`A`, `B`),
    INDEX `_OptionalClients_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
