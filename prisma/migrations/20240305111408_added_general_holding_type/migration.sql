-- AlterTable
ALTER TABLE `Holding` MODIFY `type` ENUM('EVENT', 'FLEET', 'FACILITY', 'STORE', 'GENERAL') NOT NULL;
