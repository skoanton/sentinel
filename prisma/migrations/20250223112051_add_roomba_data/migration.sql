/*
  Warnings:

  - You are about to drop the column `batteryPercentage` on the `Roomba` table. All the data in the column will be lost.
  - You are about to drop the column `chargingState` on the `Roomba` table. All the data in the column will be lost.
  - You are about to drop the column `bumperHits` on the `RoombaSession` table. All the data in the column will be lost.
  - You are about to drop the column `cliffsFront` on the `RoombaSession` table. All the data in the column will be lost.
  - You are about to drop the column `cliffsRear` on the `RoombaSession` table. All the data in the column will be lost.
  - You are about to drop the column `cycle` on the `RoombaSession` table. All the data in the column will be lost.
  - You are about to drop the column `dirtPicks` on the `RoombaSession` table. All the data in the column will be lost.
  - You are about to drop the column `motionBlocked` on the `RoombaSession` table. All the data in the column will be lost.
  - You are about to drop the column `panics` on the `RoombaSession` table. All the data in the column will be lost.
  - You are about to drop the column `scrubsCount` on the `RoombaSession` table. All the data in the column will be lost.
  - You are about to drop the column `stuckCount` on the `RoombaSession` table. All the data in the column will be lost.
  - You are about to drop the column `wheelStalls` on the `RoombaSession` table. All the data in the column will be lost.
  - The `missionStartTime` column on the `RoombaSession` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `totalBumperHits` on the `RoombaTotalStatistics` table. All the data in the column will be lost.
  - You are about to drop the column `totalCliffsFront` on the `RoombaTotalStatistics` table. All the data in the column will be lost.
  - You are about to drop the column `totalCliffsRear` on the `RoombaTotalStatistics` table. All the data in the column will be lost.
  - You are about to drop the column `totalDirtPicks` on the `RoombaTotalStatistics` table. All the data in the column will be lost.
  - You are about to drop the column `totalHours` on the `RoombaTotalStatistics` table. All the data in the column will be lost.
  - You are about to drop the column `totalMotionBlocked` on the `RoombaTotalStatistics` table. All the data in the column will be lost.
  - You are about to drop the column `totalPanics` on the `RoombaTotalStatistics` table. All the data in the column will be lost.
  - You are about to drop the column `totalStuck` on the `RoombaTotalStatistics` table. All the data in the column will be lost.
  - You are about to drop the column `totalWheelStalls` on the `RoombaTotalStatistics` table. All the data in the column will be lost.
  - Added the required column `batteryCycles` to the `Roomba` table without a default value. This is not possible if the table is not empty.
  - Added the required column `batteryLevel` to the `Roomba` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fanSpeed` to the `Roomba` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Roomba` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Roomba` table without a default value. This is not possible if the table is not empty.
  - Added the required column `batteryLevel` to the `RoombaSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `averageMissionTime` to the `RoombaTotalStatistics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `canceledMissions` to the `RoombaTotalStatistics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `failedMissions` to the `RoombaTotalStatistics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `successfulMissions` to the `RoombaTotalStatistics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalCleaningTime` to the `RoombaTotalStatistics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalMissions` to the `RoombaTotalStatistics` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RoombaTotalStatistics" DROP CONSTRAINT "RoombaTotalStatistics_roombaId_fkey";

-- AlterTable
ALTER TABLE "Roomba" DROP COLUMN "batteryPercentage",
DROP COLUMN "chargingState",
ADD COLUMN     "batteryCycles" INTEGER NOT NULL,
ADD COLUMN     "batteryLevel" INTEGER NOT NULL,
ADD COLUMN     "fanSpeed" TEXT NOT NULL,
ADD COLUMN     "position" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "RoombaSession" DROP COLUMN "bumperHits",
DROP COLUMN "cliffsFront",
DROP COLUMN "cliffsRear",
DROP COLUMN "cycle",
DROP COLUMN "dirtPicks",
DROP COLUMN "motionBlocked",
DROP COLUMN "panics",
DROP COLUMN "scrubsCount",
DROP COLUMN "stuckCount",
DROP COLUMN "wheelStalls",
ADD COLUMN     "batteryLevel" INTEGER NOT NULL,
DROP COLUMN "missionStartTime",
ADD COLUMN     "missionStartTime" TIMESTAMP(3),
ALTER COLUMN "cleanedArea" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "RoombaTotalStatistics" DROP COLUMN "totalBumperHits",
DROP COLUMN "totalCliffsFront",
DROP COLUMN "totalCliffsRear",
DROP COLUMN "totalDirtPicks",
DROP COLUMN "totalHours",
DROP COLUMN "totalMotionBlocked",
DROP COLUMN "totalPanics",
DROP COLUMN "totalStuck",
DROP COLUMN "totalWheelStalls",
ADD COLUMN     "averageMissionTime" INTEGER NOT NULL,
ADD COLUMN     "canceledMissions" INTEGER NOT NULL,
ADD COLUMN     "failedMissions" INTEGER NOT NULL,
ADD COLUMN     "successfulMissions" INTEGER NOT NULL,
ADD COLUMN     "totalCleaningTime" INTEGER NOT NULL,
ADD COLUMN     "totalMissions" INTEGER NOT NULL,
ALTER COLUMN "totalCleanedArea" SET DATA TYPE DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "RoombaTotalStatistics" ADD CONSTRAINT "RoombaTotalStatistics_roombaId_fkey" FOREIGN KEY ("roombaId") REFERENCES "Roomba"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
