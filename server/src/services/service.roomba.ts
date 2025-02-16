import { Prisma, Roomba, RoombaTotalStatistics } from "prisma";
import dorita980 from "dorita980";
import dotenv from "dotenv";
import {
  getRoombaByBlidDb,
  getTotalStatisticsByBlidDb,
  getTotalStatisticsByIdDb,
  saveLastCleaningSessionDb,
  upsertRoomba,
  upsertRoombaStatistics,
} from "../db/roomba.db";
dotenv.config();

interface CleaningJobResponse {
  cycle: string; // Cleaning cycle type (e.g., 'none', 'quick', 'standard')
  phase: string; // Current phase (e.g., 'charge', 'run', 'pause')
  expireM: number; // Time left before mission expires (minutes)
  rechrgM: number; // Estimated recharge time (minutes)
  error: number; // Error code (0 = no error)
  notReady: number; // Whether the Roomba is not ready (1 = not ready, 0 = ready)
  mssnM: number; // Total time spent on mission in minutes
  sqft: number; // Area cleaned in square feet
  initiator: string; // Who started the cleaning (manual, app, schedule, etc.)
  nMssn: number; // Total number of missions completed
}

const BLID = process.env.ROOMBA_BLID;
const PASSWORD = process.env.ROOMBA_PASSWORD;
const IP_ADDRESS = process.env.ROOMBA_IP;
let lastRoombaState: string = "";
let missionStartTime: Date = new Date();
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

    roombaLocal.on("state", async (state: any) => {
      if (!state || !state.cleanMissionStatus) {
        return;
      }

      const roombaPhase = state.cleanMissionStatus.phase;
      if (["charge", "run", "stop"].includes(roombaPhase)) {
        await checkChanges();
      }
      if (roombaPhase === "run") {
        if (lastRoombaState === "charge") {
          missionStartTime = new Date();
          console.log("🚀 Roomba has started cleaning at", missionStartTime);
        }

        lastRoombaState = roombaPhase;
        console.log("Roomba is cleaning...");
      } else if (roombaPhase === "charge") {
        if (lastRoombaState === "run") {
          console.log("Roomba is done cleaning!");

          if (missionStartTime) {
            await getLastCleaningJob();
          } else {
            console.warn(
              "⚠️ Mission start time is missing! Could not log session duration."
            );
          }
        }

        lastRoombaState = roombaPhase;
        console.log("Roomba is charging...");
      } else if (roombaPhase === "stop") {
        lastRoombaState = roombaPhase;
        console.log("Roomba is stopped...");
      } else {
        console.warn(`⚠️ Unknown Roomba phase detected: ${roombaPhase}`);
        console.log("PAHSE:", roombaPhase);
      }
    });
  } catch (error) {
    console.error("Error connecting to Roomba:", error);
    throw error;
  }
}

async function checkChanges() {
  const state = await roombaLocal.getRobotState(["batPct", "bbchg3"]);
  const existingRoomba = await getRoombaByBlidDb(BLID!);

  if (!existingRoomba) {
    console.error("Roomba not found in database");
    return;
  }

  const hasChanged =
    existingRoomba.batteryPercentage !== state.batPct ||
    existingRoomba.chargingState !== state.cleanMissionStatus.phase ||
    existingRoomba.binFull !== state.bin.full ||
    existingRoomba.software !== state.softwareVer;

  if (hasChanged) {
    console.log("⚡ Changes detected! Updating Roomba info in DB...");
    await getRoombaInfo();
  } else {
    console.log("No changes detected.");
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

export async function getLastCleaningJob(): Promise<any> {
  console.log("Inside getCurrentMissionService");
  try {
    const state = await roombaLocal.getBasicMission();
    const lastMission: CleaningJobResponse = state.cleanMissionStatus;
    console.log(lastMission);
    await saveLastCleaningJob(lastMission);
    console.log(state);
    return state;
  } catch (error) {
    console.error("Error fetching mission data:", error);
    throw error;
  }
}

export async function saveLastCleaningJob(cleaningJob: CleaningJobResponse) {
  try {
    const currentRoomba = await getRoombaByBlidDb(BLID!);

    if (!currentRoomba) {
      throw new Error("Roomba not found");
    }

    const oldTotalStatistics = await getTotalStatisticsByIdDb(currentRoomba.id);
    const currentTotalStatistics = await getRoombaStatistics();

    if (!oldTotalStatistics) {
      throw new Error("Roomba statistics not found");
    }

    const newStatistics = {
      totalHours:
        currentTotalStatistics.hr - (oldTotalStatistics?.totalHours || 0),
      totalCleanedArea:
        currentTotalStatistics.sqft -
        (oldTotalStatistics?.totalCleanedArea || 0),
      totalStuck:
        currentTotalStatistics.nStuck - (oldTotalStatistics?.totalStuck || 0),
      totalScrubs:
        currentTotalStatistics.nScrubs - (oldTotalStatistics?.totalScrubs || 0),
      totalDirtPicks:
        currentTotalStatistics.nPicks -
        (oldTotalStatistics?.totalDirtPicks || 0),
      totalPanics:
        currentTotalStatistics.nPanics - (oldTotalStatistics?.totalPanics || 0),
      totalCliffsFront:
        currentTotalStatistics.nCliffsF -
        (oldTotalStatistics?.totalCliffsFront || 0),
      totalCliffsRear:
        currentTotalStatistics.nCliffsR -
        (oldTotalStatistics?.totalCliffsRear || 0),
      totalMotionBlocked:
        currentTotalStatistics.nMBStll -
        (oldTotalStatistics?.totalMotionBlocked || 0),
      totalWheelStalls:
        currentTotalStatistics.nWStll -
        (oldTotalStatistics?.totalWheelStalls || 0),
      totalBumperHits:
        currentTotalStatistics.nCBump -
        (oldTotalStatistics?.totalBumperHits || 0),
    };

    const unixMissionStartTime = Math.floor(missionStartTime.getTime() / 1000);
    const newRoombaSession: Prisma.RoombaSessionCreateInput = {
      cycle: cleaningJob.cycle,
      errorCode: cleaningJob.error,
      missionStartTime: unixMissionStartTime,
      missionTime: cleaningJob.mssnM,
      cleanedArea: cleaningJob.sqft,
      initiator: cleaningJob.initiator,
      stuckCount: newStatistics.totalStuck,
      scrubsCount: newStatistics.totalScrubs,
      dirtPicks: newStatistics.totalDirtPicks,
      panics: newStatistics.totalPanics,
      cliffsFront: newStatistics.totalCliffsFront,
      cliffsRear: newStatistics.totalCliffsRear,
      motionBlocked: newStatistics.totalMotionBlocked,
      wheelStalls: newStatistics.totalWheelStalls,
      bumperHits: newStatistics.totalBumperHits,
      roomba: {
        connect: {
          id: currentRoomba.id,
        },
      },
    };

    return await saveLastCleaningSessionDb(newRoombaSession);
  } catch (error) {
    console.error("Error saving cleaning job:", error);
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

export async function startRoombaCleaning() {
  try {
    await roombaLocal.start();
    console.log("Roomba started cleaning");
  } catch (error) {
    console.error("Error starting Roomba:", error);
    throw error;
  }
}

export async function stopRoombaCleaning() {
  try {
    await roombaLocal.stop();
    await roombaLocal.dock();
    console.log("Roomba stopped cleaning");
  } catch (error) {
    console.error("Error stopping Roomba:", error);
    throw error;
  }
}
