/*
  Warnings:

  - Added the required column `batteryPercentage` to the `Roomba` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chargingState` to the `Roomba` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cleanSchedule` to the `Roomba` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Roomba" ADD COLUMN     "batteryPercentage" INTEGER NOT NULL,
ADD COLUMN     "chargingState" TEXT NOT NULL,
ADD COLUMN     "cleanSchedule" JSONB NOT NULL;
