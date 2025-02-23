export type WeatherDataResponse = {
  time: string; // Timestamp as a formatted string
  main: string; // Main weather condition (e.g., "Clouds")
  temperature: number; // Temperature in °C
  description: string; // Weather description (e.g., "few clouds")
  humidity: number; // Humidity in percentage
  visibility: number; // Visibility in meters
  wind: {
    speed: number; // Wind speed in m/s
    deg: number; // Wind direction in degrees
  };
  sunrise: number; // Unix timestamp (seconds)
  sunset: number; // Unix timestamp (seconds)
};

export type SystemInformation = {
  uptime: {
    hours: number;
    minutes: number;
  };
  cpu: {
    manufacturer: string;
    brand: string;
    speed: number;
    cores: number;
    physicalCores: number;
  };
  os: {
    platform: string;
    distro: string;
    release: string;
  };
  ram: {
    total: number;
    free: number;
    used: number;
  };
  hardDrives: {
    name: string;
    size: number;
    used: number;
    available: number;
    use: number;
  }[];
};

export type ErrorResponse = {
  message: string;
  status: number;
};

export type RoombaStatsResponse = {
  batteryLevel: number;
  batteryCycles: number;
  fanSpeed: string;
  binPresent: boolean;
  binFull: boolean;
  state: string;

  totalStatistics: {
    totalCleaningTime: number;
    averageMissionTime: number;
    totalMissions: number;
    successfulMissions: number;
    failedMissions: number;
    canceledMissions: number;
    totalScrubs: number;
    totalCleanedArea: number;
  };
};
