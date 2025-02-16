import axios from "axios";
import { Roomba, RoombaTotalStatistics } from "prisma";

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
