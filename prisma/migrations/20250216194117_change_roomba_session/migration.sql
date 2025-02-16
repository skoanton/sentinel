/*
  Warnings:

  - You are about to drop the column `binFull` on the `RoombaSession` table. All the data in the column will be lost.
  - You are about to drop the column `binPresent` on the `RoombaSession` table. All the data in the column will be lost.
  - You are about to drop the column `expireTime` on the `RoombaSession` table. All the data in the column will be lost.
  - You are about to drop the column `notReady` on the `RoombaSession` table. All the data in the column will be lost.
  - You are about to drop the column `rechargeTime` on the `RoombaSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RoombaSession" DROP COLUMN "binFull",
DROP COLUMN "binPresent",
DROP COLUMN "expireTime",
DROP COLUMN "notReady",
DROP COLUMN "rechargeTime";
