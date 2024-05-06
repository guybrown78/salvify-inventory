/*
  Warnings:

  - You are about to drop the column `bnfURL` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `emcPilURL` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Item` DROP COLUMN `bnfURL`,
    DROP COLUMN `emcPilURL`,
    ADD COLUMN `bnfSlug` VARCHAR(191) NULL,
    ADD COLUMN `emcId` VARCHAR(191) NULL;
