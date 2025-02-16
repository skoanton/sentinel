import axios from "axios";
import { Roomba, RoombaSession, RoombaTotalStatistics } from "prisma";

const API_URL = import.meta.env.VITE_API_URL;

export async function getRoombas(): Promise<Roomba[] | null> {
  try {
    const response = await axios.get(`${API_URL}/api/roomba/all`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getRoombaStatistics(
  id: string
): Promise<RoombaTotalStatistics | null> {
  try {
    const response = await axios.get(`${API_URL}/api/roomba/statistics/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function startRoombaCleaning(): Promise<void> {
  try {
    await axios.post(`${API_URL}/api/roomba/start-cleaning`);
  } catch (error) {
    console.error(error);
  }
}

export async function stopRoombaCleaning(): Promise<void> {
  try {
    await axios.post(`${API_URL}/api/roomba/stop-cleaning`);
  } catch (error) {
    console.error(error);
  }
}

export async function getRoombaSessions(
  id: string
): Promise<RoombaSession[] | null> {
  try {
    const response = await axios.get(`${API_URL}/api/roomba/sessions/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
