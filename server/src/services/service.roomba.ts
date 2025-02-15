import { Prisma, Roomba, RoombaTotalStatistics } from "@prisma/client";
import dorita980 from "dorita980";
import dotenv from "dotenv";
import { upsertRoomba, upsertRoombaStatistics } from "../db/roomba.db";
dotenv.config();

const BLID = process.env.ROOMBA_BLID;
const PASSWORD = process.env.ROOMBA_PASSWORD;
const IP_ADDRESS = process.env.ROOMBA_IP;
if (!BLID || !PASSWORD || !IP_ADDRESS) {
  throw new Error("Roomba credentials are missing");
}
const roombaLocal = new dorita980.Local(BLID, PASSWORD, IP_ADDRESS);

export async function connectRoomba() {
  try {
    console.log("Connecting to Roomba...");

    roombaLocal.on("connect", async () => {
      console.log("✅ Successfully connected to Roomba!");
      await getRoombaInfo();
    });

    roombaLocal.on("error", (err: any) => {
      console.error("❌ Roomba connection error:", err);
    });

    roombaLocal.on("close", () => {
      console.log("⚠️ Roomba connection closed.");
    });
  } catch (error) {
    console.error("Error connecting to Roomba:", error);
    throw error;
  }
}

async function getRoombaInfo() {
  try {
    const state = await roombaLocal.getRobotState(["batPct", "bbchg3"]);
    const newRoomba: Prisma.RoombaCreateInput = {
      name: state.name,
      mac: state.mac,
      ip: IP_ADDRESS!,
      model: state.sku,
      software: state.softwareVer,
      blid: BLID!,
      binPresent: state.bin.present,
      binFull: state.bin.full,
      batteryPercentage: state.batPct,
      chargingState: state.cleanMissionStatus.phase,
    };
    await upsertRoomba(newRoomba).then((roomba) =>
      saveRoombaStatistics(roomba).then(() => console.log("Roomba stats saved"))
    );
  } catch (error) {
    console.error("Error fetching Roomba info:", error);
    throw error;
  }
}

export async function getCurrentMissionService(): Promise<any> {
  console.log("Inside getCurrentMissionService");
  try {
    const state = await roombaLocal.getBasicMission();
    console.log(state);
    return state;
  } catch (error) {
    console.error("Error fetching mission data:", error);
    throw error;
  }
}

export async function getRoombaStatistics() {
  try {
    const stats = await roombaLocal.getBbrun();
    if (!stats) throw new Error("Roomba statistics could not be fetched.");

    return stats;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
}

export async function saveRoombaStatistics(
  roomba: Roomba
): Promise<RoombaTotalStatistics> {
  try {
    if (!roomba) {
      throw new Error("Roomba not found");
    }

    const stats = await getRoombaStatistics();

    const newRoombaStatistics: Prisma.RoombaTotalStatisticsCreateInput = {
      totalHours: stats.hr,
      totalCleanedArea: stats.sqft,
      totalStuck: stats.nStuck,
      totalScrubs: stats.nScrubs,
      totalBumperHits: stats.nCBump,
      totalCliffsFront: stats.nCliffsF,
      totalCliffsRear: stats.nCliffsR,
      totalDirtPicks: stats.nPicks,
      totalMotionBlocked: stats.nMBStll,
      totalPanics: stats.nPanics,
      totalWheelStalls: stats.nWStll,
      roomba: {
        connect: {
          id: roomba.id,
        },
      },
    };

    return await upsertRoombaStatistics(newRoombaStatistics);
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
}
