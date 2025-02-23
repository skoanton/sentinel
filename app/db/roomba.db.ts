import { Prisma, PrismaClient, Roomba, RoombaSession, RoombaTotalStatistics } from "@prisma/client";

const prisma = new PrismaClient();

//prisma queys here
export async function upsertRoomba(roomba: Prisma.RoombaCreateInput): Promise<Roomba> {
  const createdRoomba = await prisma.roomba.upsert({
    where: { id: roomba.id },
    update: roomba,
    create: roomba,
  });
  return createdRoomba;
}

export async function createRoombaDb(roomba: Prisma.RoombaCreateInput): Promise<Roomba> {
  const createdRoomba = await prisma.roomba.create({
    data: roomba,
  });
  return createdRoomba;
}

export async function getRoombaByNameDb(name: string): Promise<Roomba | null> {
  return await prisma.roomba.findFirst({
    where: {
      name: name,
    },
  });
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

export async function getTotalStatisticsByIdDb(id: string): Promise<RoombaTotalStatistics | null> {
  return await prisma.roombaTotalStatistics.findFirst({
    where: {
      roomba: {
        id: id,
      },
    },
  });
}

export async function getRoombaByIdDb(id: string): Promise<Roomba | null> {
  return await prisma.roomba.findFirst({
    where: {
      id: id,
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
