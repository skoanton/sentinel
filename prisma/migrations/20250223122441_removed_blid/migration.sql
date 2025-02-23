/*
  Warnings:

  - You are about to drop the column `blid` on the `Roomba` table. All the data in the column will be lost.
  - You are about to drop the column `ip` on the `Roomba` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Roomba_blid_key";

-- AlterTable
ALTER TABLE "Roomba" DROP COLUMN "blid",
DROP COLUMN "ip";
