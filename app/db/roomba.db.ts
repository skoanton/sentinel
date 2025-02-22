import { Prisma, PrismaClient, Roomba, RoombaSession, RoombaTotalStatistics } from "@prisma/client";

const prisma = new PrismaClient();

//prisma queys here
export async function upsertRoomba(roomba: Prisma.RoombaCreateInput): Promise<Roomba> {
  const createdRoomba = await prisma.roomba.upsert({
    where: { blid: roomba.blid },
    update: roomba,
    create: roomba,
  });
  return createdRoomba;
}

export async function upsertRoombaStatistics(statistics: Prisma.RoombaTotalStatisticsCreateInput): Promise<any> {
  const createdRoombaStatistics = await prisma.roombaTotalStatistics.upsert({
    where: { roombaId: statistics.roomba.connect!.id },
    create: statistics,
    update: statistics,
  });
  return createdRoombaStatistics;
}

export async function getAllRoombasDb(): Promise<Roomba[]> {
  return await prisma.roomba.findMany();
}

export async function getTotalStatisticsDb(): Promise<RoombaTotalStatistics[]> {
  return await prisma.roombaTotalStatistics.findMany();
}

export async function getTotalStatisticsByIdDb(roombaId: string): Promise<RoombaTotalStatistics | null> {
  return await prisma.roombaTotalStatistics.findFirst({
    where: {
      roombaId: roombaId,
    },
  });
}

export async function getTotalStatisticsByBlidDb(blid: string): Promise<RoombaTotalStatistics | null> {
  return await prisma.roombaTotalStatistics.findFirst({
    where: {
      roomba: {
        blid: blid,
      },
    },
  });
}

export async function getRoombaByBlidDb(blid: string): Promise<Roomba | null> {
  return await prisma.roomba.findFirst({
    where: {
      blid: blid,
    },
  });
}

export async function saveLastCleaningSessionDb(cleaningSession: Prisma.RoombaSessionCreateInput): Promise<any> {
  return await prisma.roombaSession.create({
    data: cleaningSession,
  });
}

export async function getRoombaSessionsByIdDb(roombaId: string): Promise<RoombaSession[]> {
  return await prisma.roombaSession.findMany({
    where: {
      roombaId: roombaId,
    },
  });
}
