/*
  Warnings:

  - You are about to drop the column `description` on the `Location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Location` DROP COLUMN `description`,
    ADD COLUMN `field` VARCHAR(255) NULL;
