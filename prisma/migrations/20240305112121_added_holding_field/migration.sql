/*
  Warnings:

  - Added the required column `field` to the `Holding` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Holding` ADD COLUMN `field` VARCHAR(255) NOT NULL,
    MODIFY `type` ENUM('EVENT', 'FLEET', 'FACILITY', 'STORE', 'GENERAL') NOT NULL DEFAULT 'GENERAL';
