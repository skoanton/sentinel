/*
  Warnings:

  - You are about to drop the column `expireM` on the `RoombaSession` table. All the data in the column will be lost.
  - You are about to drop the column `missionCount` on the `RoombaSession` table. All the data in the column will be lost.
  - You are about to drop the column `phase` on the `RoombaSession` table. All the data in the column will be lost.
  - You are about to drop the column `rechargeM` on the `RoombaSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RoombaSession" DROP COLUMN "expireM",
DROP COLUMN "missionCount",
DROP COLUMN "phase",
DROP COLUMN "rechargeM";
