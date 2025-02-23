import { Prisma } from "@prisma/client";
import axios from "axios";
import dotenv from "dotenv";
import WebSocket from "ws";
import { createRoombaDb, getRoombaByNameDb, upsertRoomba } from "~/db/roomba.db";
import { RoombaStatsResponse } from "~/types/general";
dotenv.config();

const HOME_ASSISTANT_URL = process.env.HOME_ASSISTANT_URL;
const HOME_ASSISTANT_IP = process.env.HOME_ASSISTANT_IP;
const TOKEN = process.env.HOME_ASSISTANT_TOKEN;

export async function getRoomba() {
  return new Promise((resolve, reject) => {
    if (!HOME_ASSISTANT_IP || !TOKEN) {
      return reject(new Error("Missing required environment variables"));
    }

    const ws = new WebSocket(`ws://${HOME_ASSISTANT_IP}:8123/api/websocket`);

    ws.on("open", () => {
      console.log("Connected to Home Assistant WebSocket API");

      // Skicka autentisering
      ws.send(JSON.stringify({ type: "auth", access_token: TOKEN }));
    });

    ws.on("message", async (data) => {
      const message = JSON.parse(data.toString());

      // Vänta på autentisering
      if (message.type === "auth_required") {
        ws.send(JSON.stringify({ type: "auth", access_token: TOKEN }));
      }

      if (message.type === "auth_ok") {
        console.log("Authenticated!");

        // Hämta enhetslistan
        ws.send(JSON.stringify({ id: 1, type: "config/device_registry/list" }));
      }

      // Få svaret med enhetsdata
      if (message.type === "result" && message.success) {
        const roombaDevice = message.result.find((device: any) => device.name.toLowerCase().includes("ragnar"));

        if (roombaDevice) {
          const roombaStats = await getRoombaStats();
          const existingRoomba = await getRoombaByNameDb(roombaDevice.name);

          const roomba: Prisma.RoombaCreateInput = {
            id: existingRoomba?.id,
            name: roombaDevice.name,
            model: roombaDevice.model,
            software: roombaDevice.sw_version,
            mac: roombaDevice.connections.find((conn: any) => conn[0] === "mac")?.[1] || "",
            state: roombaStats.state,
            batteryLevel: roombaStats.batteryLevel,
            batteryCycles: roombaStats.batteryCycles,
            fanSpeed: roombaStats.fanSpeed,
            binPresent: roombaStats.binPresent,
            binFull: roombaStats.binFull,
          };

          if (existingRoomba) {
            console.log("Roomba device already exists. Updating Roomba device.");
            const updatedRoomba = await upsertRoomba(roomba);

            resolve(updatedRoomba);
          } else {
            console.log("Creating new Roomba device.");
            const newRoomba = await createRoombaDb(roomba);
            resolve(newRoomba);
          }
        } else {
          console.error("No Roomba device found.");
          reject(new Error("No Roomba device found"));
        }

        ws.close();
      }
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
      reject(error);
    });

    ws.on("close", () => {
      console.log("Disconnected from Home Assistant WebSocket API");
    });
  });
}

export async function getRoombaStats() {
  try {
    if (!HOME_ASSISTANT_URL || !TOKEN) {
      throw new Error("Missing required environment variables");
    }

    const response = await axios.get(`${HOME_ASSISTANT_URL}/api/states`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    if (!response.data) {
      throw new Error("No data returned from Home Assistant API");
    }

    const parsedStats = parseRoombaStats(response.data);

    return parsedStats;
  } catch (error) {
    console.error("Error getting Roomba stats:", error);
    throw error;
  }
}

function parseRoombaStats(data: any[]): RoombaStatsResponse {
  return {
    batteryLevel: Number(data.find((d) => d.entity_id === "sensor.ragnar_battery")?.state || 0),
    batteryCycles: Number(data.find((d) => d.entity_id === "sensor.ragnar_battery_cycles")?.state || 0),
    fanSpeed: data.find((d) => d.entity_id === "vacuum.ragnar")?.attributes.fan_speed || "Unknown",
    binPresent: data.find((d) => d.entity_id === "vacuum.ragnar")?.attributes.bin_present || false,
    binFull: data.find((d) => d.entity_id === "vacuum.ragnar")?.attributes.bin_full || false,
    state: data.find((d) => d.entity_id === "vacuum.ragnar")?.state || "Unknown",

    totalStatistics: {
      totalCleaningTime: Number(data.find((d) => d.entity_id === "sensor.ragnar_total_cleaning_time")?.state || 0),
      averageMissionTime: Number(data.find((d) => d.entity_id === "sensor.ragnar_average_mission_time")?.state || 0),
      totalMissions: Number(data.find((d) => d.entity_id === "sensor.ragnar_total_missions")?.state || 0),
      successfulMissions: Number(data.find((d) => d.entity_id === "sensor.ragnar_successful_missions")?.state || 0),
      failedMissions: Number(data.find((d) => d.entity_id === "sensor.ragnar_failed_missions")?.state || 0),
      canceledMissions: Number(data.find((d) => d.entity_id === "sensor.ragnar_canceled_missions")?.state || 0),
      totalScrubs: Number(data.find((d) => d.entity_id === "sensor.ragnar_scrubs")?.state || 0),
      totalCleanedArea: Number(data.find((d) => d.entity_id === "sensor.ragnar_total_cleaned_area")?.state || 0),
    },
  };
}
