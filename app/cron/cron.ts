import cron from "node-cron";
import { saveWeatherData } from "~/services/weather";

export async function startCron() {
  console.log("Starting cron job");
  cron.schedule("0 12 * * *", async () => {
    console.log("Running cron job to save weather data");
    const savedData = await saveWeatherData();
    if (savedData) {
      console.log("🌤️ Weather data saved successfully");
    } else {
      console.error("❌ Failed to save weather data");
    }
  });
}
