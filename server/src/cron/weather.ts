import cron from "node-cron";
import { getWeather, saveWeatherData } from "../services/service.weather";

export async function runWeatherCron() {
  cron.schedule("0 12 * * *", async () => {
    console.log("Starting cron job");
    const weather = await getWeather();
    if (!weather) {
      console.error("No weather data found");
      return;
    }
    await saveWeatherData(weather);
  });
}
