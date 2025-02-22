-- CreateTable
CREATE TABLE "ServerStats" (
    "id" TEXT NOT NULL,
    "cpuUsage" DOUBLE PRECISION NOT NULL,
    "ramUsage" DOUBLE PRECISION NOT NULL,
    "diskUsage" DOUBLE PRECISION NOT NULL,
    "networkSpeed" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServerStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DockerContainer" (
    "id" TEXT NOT NULL,
    "containerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "cpuUsage" DOUBLE PRECISION,
    "ramUsage" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DockerContainer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roomba" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "mac" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "software" TEXT NOT NULL,
    "blid" TEXT NOT NULL,
    "binPresent" BOOLEAN NOT NULL,
    "binFull" BOOLEAN NOT NULL,
    "batteryPercentage" INTEGER NOT NULL,
    "chargingState" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
    "errorCode" INTEGER NOT NULL,
    "missionTime" INTEGER NOT NULL,
    "missionStartTime" INTEGER NOT NULL,
    "initiator" TEXT NOT NULL,
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoombaSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeatherData" (
    "id" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "main" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "humidity" INTEGER NOT NULL,
    "visibility" INTEGER NOT NULL,
    "windSpeed" DOUBLE PRECISION NOT NULL,
    "windDirection" INTEGER NOT NULL,
    "sunrise" INTEGER NOT NULL,
    "sunset" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeatherData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NetworkDevice" (
    "id" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "macAddress" TEXT NOT NULL,
    "deviceName" TEXT,
    "lastSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NetworkDevice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DockerContainer_containerId_key" ON "DockerContainer"("containerId");

-- CreateIndex
CREATE UNIQUE INDEX "Roomba_blid_key" ON "Roomba"("blid");

-- CreateIndex
CREATE UNIQUE INDEX "RoombaTotalStatistics_roombaId_key" ON "RoombaTotalStatistics"("roombaId");

-- CreateIndex
CREATE UNIQUE INDEX "NetworkDevice_ipAddress_key" ON "NetworkDevice"("ipAddress");

-- AddForeignKey
ALTER TABLE "RoombaTotalStatistics" ADD CONSTRAINT "RoombaTotalStatistics_roombaId_fkey" FOREIGN KEY ("roombaId") REFERENCES "Roomba"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoombaSession" ADD CONSTRAINT "RoombaSession_roombaId_fkey" FOREIGN KEY ("roombaId") REFERENCES "Roomba"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
