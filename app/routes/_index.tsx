import { json, type MetaFunction } from "@remix-run/node";
import SystemInformationCard from "~/components/SystemInformationCard";
import { Button } from "~/components/ui/button";
import WeatherCard from "~/components/WeatherCard";
import { getSystemInformation } from "~/services/systemInformation";
import { getWeather } from "~/services/weather";

export async function loader() {
  const systemInformation = await getSystemInformation();
  const weather = await getWeather();

  return json({ systemInformation, weather });
}

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Index() {
  return (
    <div className="flex gap-4 p-4">
      <div>
        <SystemInformationCard />
      </div>
      <div className="ml-auto">
        <WeatherCard />
      </div>
    </div>
  );
}
