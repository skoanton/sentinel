/*
  Warnings:

  - You are about to drop the column `lastUpdated` on the `Roomba` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Roomba" DROP COLUMN "lastUpdated",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
