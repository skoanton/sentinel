import { getWeather } from "@/api/api.weather";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { WeatherData } from "@shared/types/general";
import {
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Sunrise,
  Sunset,
  Calendar,
} from "lucide-react";
import { useEffect, useState } from "react";

type WeatherCardProps = {};

export default function WeatherCard({}: WeatherCardProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await getWeather();
      setWeather(response);
    };
    fetchWeather();
  }, []);

  if (weather === null) {
    return <p>Loading weather...</p>;
  }

  return (
    <Card className="max-w-sm w-full mx-auto border rounded-lg shadow-md p-4 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
      <CardHeader className="text-center">
        <CardTitle className="text-lg font-bold flex items-center justify-center gap-2">
          <Calendar className="w-5 h-5" />{" "}
          {new Date(weather.time).toLocaleString()}
        </CardTitle>
        <p className="text-sm">
          {weather.main} - {weather.description}
        </p>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-red-300" />
          <span>{weather.temperature.toFixed(1)}°C</span>
        </div>
        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-blue-300" />
          <span>{weather.humidity}% Humidity</span>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="w-5 h-5 text-gray-200" />
          <span>
            {weather.wind.speed} m/s ({weather.wind.deg}°)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Sun className="w-5 h-5 text-yellow-300" />
          <span>Visibility: {weather.visibility / 1000} km</span>
        </div>
        <div className="flex items-center gap-2">
          <Sunrise className="w-5 h-5 text-orange-300" />
          <span>{new Date(weather.sunrise * 1000).toLocaleTimeString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Sunset className="w-5 h-5 text-pink-300" />
          <span>{new Date(weather.sunset * 1000).toLocaleTimeString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}
