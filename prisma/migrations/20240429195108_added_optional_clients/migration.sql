-- CreateTable
CREATE TABLE `_OptionalClients` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_OptionalClients_AB_unique`(`A`, `B`),
    INDEX `_OptionalClients_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
