import { SystemInformation } from "@shared/types/general";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function getSystemInformation(): Promise<SystemInformation | null> {
  try {
    const response = await axios.get(`${API_URL}/api/server/information`);

    const systemInformation: SystemInformation = response.data;

    return systemInformation;
  } catch (error) {
    console.error(error);
    return null;
  }
}
