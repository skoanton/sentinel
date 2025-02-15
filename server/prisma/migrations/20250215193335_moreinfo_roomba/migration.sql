/*
  Warnings:

  - Added the required column `fullBin` to the `Roomba` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Roomba" ADD COLUMN     "fullBin" BOOLEAN NOT NULL;
