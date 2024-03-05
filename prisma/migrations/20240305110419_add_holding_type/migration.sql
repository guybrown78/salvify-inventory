/*
  Warnings:

  - Added the required column `type` to the `Holding` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Holding` ADD COLUMN `isMainHolding` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `type` ENUM('EVENT', 'FLEET', 'FACILITY', 'STORE') NOT NULL;
