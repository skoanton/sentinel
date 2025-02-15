import {
  Prisma,
  PrismaClient,
  Roomba,
  RoombaTotalStatistics,
} from "@prisma/client";

const prisma = new PrismaClient();

export async function upsertRoomba(
  roomba: Prisma.RoombaCreateInput
): Promise<Roomba> {
  const createdRoomba = await prisma.roomba.upsert({
    where: { blid: roomba.blid },
    update: roomba,
    create: roomba,
  });
  return createdRoomba;
}

export async function upsertRoombaStatistics(
  statistics: Prisma.RoombaTotalStatisticsCreateInput
): Promise<any> {
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
