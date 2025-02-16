/*
  Warnings:

  - You are about to drop the column `fullBin` on the `Roomba` table. All the data in the column will be lost.
  - Added the required column `binFull` to the `Roomba` table without a default value. This is not possible if the table is not empty.
  - Added the required column `binPresent` to the `Roomba` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Roomba" DROP COLUMN "fullBin",
ADD COLUMN     "binFull" BOOLEAN NOT NULL,
ADD COLUMN     "binPresent" BOOLEAN NOT NULL;
