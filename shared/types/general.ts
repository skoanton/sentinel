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

export type NetworkDevice = {
  iface: string;
  ifaceName: string;
  ip4: string;
  mac: string;
  internal: boolean;
  virtual: boolean;
};

export type NetworkInformation = {
  devices: NetworkDevice[];
};

export type WeatherData = {
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
