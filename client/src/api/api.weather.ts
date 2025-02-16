import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function getWeather() {
  try {
    const response = await axios.get(`${API_URL}/api/weather`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
