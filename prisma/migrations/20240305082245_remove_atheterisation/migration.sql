/*
  Warnings:

  - The values [ATHETERISATION] on the enum `Item_grouping` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Item` MODIFY `grouping` ENUM('NONE', 'UNKNOWN', 'CARDIOVASCULAR', 'GASTROINTESTINAL', 'ANALGESICS_ANTISPASMODICS', 'NERVOUS', 'ALLERGY_ANAPHYLAXSIS', 'RESPIRATORY', 'ANTIINFECTION', 'REHYDRATION', 'EXTERNAL', 'RESUSCITATION', 'DRESSING', 'INSTRUMENTS', 'MONITORING', 'INJECTION_CATHETERIZATION', 'GENERAL', 'IMMOBILIZATION', 'ADDITIONAL') NULL;