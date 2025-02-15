/*
  Warnings:

  - You are about to drop the `RoombaStats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "RoombaStats";

-- CreateTable
CREATE TABLE "Roomba" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "mac" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "software" TEXT NOT NULL,
    "blid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Roomba_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoombaTotalStatistics" (
    "id" TEXT NOT NULL,
    "roombaId" TEXT NOT NULL,
    "totalHours" INTEGER NOT NULL,
    "totalCleanedArea" INTEGER NOT NULL,
    "totalStuck" INTEGER NOT NULL,
    "totalScrubs" INTEGER NOT NULL,
    "totalDirtPicks" INTEGER NOT NULL,
    "totalPanics" INTEGER NOT NULL,
    "totalCliffsFront" INTEGER NOT NULL,
    "totalCliffsRear" INTEGER NOT NULL,
    "totalMotionBlocked" INTEGER NOT NULL,
    "totalWheelStalls" INTEGER NOT NULL,
    "totalBumperHits" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoombaTotalStatistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoombaSession" (
    "id" TEXT NOT NULL,
    "roombaId" TEXT NOT NULL,
    "cycle" TEXT NOT NULL,
    "phase" TEXT NOT NULL,
    "expireM" INTEGER NOT NULL,
    "rechargeM" INTEGER NOT NULL,
    "errorCode" INTEGER NOT NULL,
    "notReady" INTEGER NOT NULL,
    "missionTime" INTEGER NOT NULL,
    "missionStartTime" INTEGER NOT NULL,
    "expireTime" INTEGER NOT NULL,
    "rechargeTime" INTEGER NOT NULL,
    "initiator" TEXT NOT NULL,
    "missionCount" INTEGER NOT NULL,
    "cleanedArea" INTEGER NOT NULL,
    "stuckCount" INTEGER NOT NULL,
    "scrubsCount" INTEGER NOT NULL,
    "dirtPicks" INTEGER NOT NULL,
    "panics" INTEGER NOT NULL,
    "cliffsFront" INTEGER NOT NULL,
    "cliffsRear" INTEGER NOT NULL,
    "motionBlocked" INTEGER NOT NULL,
    "wheelStalls" INTEGER NOT NULL,
    "bumperHits" INTEGER NOT NULL,
    "binPresent" BOOLEAN NOT NULL,
    "binFull" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoombaSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Roomba_blid_key" ON "Roomba"("blid");

-- CreateIndex
CREATE UNIQUE INDEX "RoombaTotalStatistics_roombaId_key" ON "RoombaTotalStatistics"("roombaId");

-- AddForeignKey
ALTER TABLE "RoombaTotalStatistics" ADD CONSTRAINT "RoombaTotalStatistics_roombaId_fkey" FOREIGN KEY ("roombaId") REFERENCES "Roomba"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoombaSession" ADD CONSTRAINT "RoombaSession_roombaId_fkey" FOREIGN KEY ("roombaId") REFERENCES "Roomba"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
