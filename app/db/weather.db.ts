import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function saveWeatherDataDb(weather: Prisma.WeatherDataCreateInput) {
  const createdWeatherData = await prisma.weatherData.create({
    data: weather,
  });
  return createdWeatherData;
}
