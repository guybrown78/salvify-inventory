-- CreateTable
CREATE TABLE `Item` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `type` ENUM('NONE', 'UNKNOWN', 'TABLET', 'INJECTION', 'SPRAY', 'LIQUID', 'SUPPOSITORY', 'CAPSULE', 'AMPOULE', 'CREAM', 'GEL', 'TOPICAL', 'BUCCAL', 'PREFILLED_SYRINGE', 'SYRINGE', 'DRESSING', 'DROPS', 'PESSARY', 'INHALER') NULL,
    `category` ENUM('NONE', 'UNKNOWN', 'DRUG', 'DRESSING', 'DISPOSABLE', 'BEDDING', 'SPLINT', 'STRETCHER', 'HARDWARE') NULL,
    `grouping` ENUM('NONE', 'UNKNOWN', 'CARDIOVASCULAR', 'GASTROINTESTINAL', 'ANALGESICSANTISPASMODICS', 'NERVOUS', 'ALLERGYANAPHYLAXSIS', 'RESPIRATORY', 'ANTIINFECTION', 'REHYDRATION', 'EXTERNAL', 'RESUSCITATION', 'DRESSING', 'INSTRUMENTS', 'MONITORINGE', 'ATHETERISATION', 'GENERAL', 'IMMOBILIZATION', 'ADDITIONAL') NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `information` TEXT NULL,
    `instructionsURL` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
