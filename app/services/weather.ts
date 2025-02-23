import { Prisma, WeatherData } from "@prisma/client";
import axios from "axios";
import { saveWeatherDataDb } from "~/db/weather.db";
import { ErrorResponse, WeatherDataResponse } from "~/types/general";

const API_URL = process.env.FORECAST_WEATHER_API;
const API_KEY = process.env.FORECAST_WEATHER_API_KEY;

export async function getWeather(): Promise<WeatherDataResponse | null> {
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

export async function saveWeatherData(): Promise<WeatherData | null> {
  try {
    const weatherData = await getWeather();

    if (!weatherData) {
      throw new Error("No weather data found");
    }

    const weatherDataToSave: Prisma.WeatherDataCreateInput = {
      temperature: weatherData.temperature,
      humidity: weatherData.humidity,
      windSpeed: weatherData.wind.speed,
      windDirection: weatherData.wind.deg,
      visibility: weatherData.visibility,
      sunrise: weatherData.sunrise,
      sunset: weatherData.sunset,
      description: weatherData.description,
      main: weatherData.main,
      time: new Date(weatherData.time),
    };

    const savedWeather = await saveWeatherDataDb(weatherDataToSave);

    if (!savedWeather) {
      throw new Error("Failed to save weather data");
    }

    return savedWeather;
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
}
