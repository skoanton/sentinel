import { Prisma, PrismaClient } from "prisma";

const prisma = new PrismaClient();

export async function saveWeatherDataDb(
  weather: Prisma.WeatherDataCreateInput
) {
  const createdWeatherData = await prisma.weatherData.create({
    data: weather,
  });
  return createdWeatherData;
}
