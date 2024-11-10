/*
  Warnings:

  - Made the column `body` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageUrl` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Post` MODIFY `body` VARCHAR(191) NOT NULL,
    MODIFY `imageUrl` VARCHAR(191) NOT NULL;
