/*
  Warnings:

  - Added the required column `slug` to the `Holding` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Holding` ADD COLUMN `slug` VARCHAR(255) NOT NULL;
