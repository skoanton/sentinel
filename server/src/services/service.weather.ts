import cron from "node-cron";
import axios from "axios";
import dotenv from "dotenv";
import { WeatherData } from "@shared/types/general";
import { Prisma } from "prisma";
import { saveWeatherDataDb } from "../db/weather.db";

dotenv.config();

const API_URL = process.env.FORECAST_WEATHER_API;
const API_KEY = process.env.FORECAST_WEATHER_API_KEY;
export async function getWeather(): Promise<WeatherData | null> {
  try {
    if (!API_URL) {
      throw new Error("No weather API URL found");
    }

    const response = await axios.get(`${API_URL}/weather`, {
      headers: {
        Authorization: API_KEY,
      },
    });

    if (!response) {
      throw new Error("No weather data found");
    }

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function saveWeatherData(weatherData: WeatherData): Promise<void> {
  const weather: Prisma.WeatherDataCreateInput = {
    main: weatherData.main,
    description: weatherData.description,
    temperature: weatherData.temperature,
    humidity: weatherData.humidity,
    visibility: weatherData.visibility,
    windSpeed: weatherData.wind.speed,
    windDirection: weatherData.wind.deg,
    sunrise: weatherData.sunrise,
    sunset: weatherData.sunset,
  };

  await saveWeatherDataDb(weather);
}
