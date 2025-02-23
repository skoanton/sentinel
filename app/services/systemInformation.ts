import { SystemInformation } from "~/types/general";
import si from "systeminformation";

export async function getSystemInformation(): Promise<SystemInformation> {
  const cpu = await si.cpu();
  const os = await si.osInfo();
  const ram = await si.mem();
  const hardDrives = await si.fsSize();

  if (!cpu || !os || !ram) {
    throw new Error("Could not get system information");
  }

  const hardDrivesInfo = hardDrives.map((drive) => {
    return {
      name: drive.fs,
      size: parseFloat((drive.size / 1024 ** 3).toFixed(2)), // Convert bytes to GB
      used: parseFloat((drive.used / 1024 ** 3).toFixed(2)), // Convert bytes to GB
      available: parseFloat((drive.available / 1024 ** 3).toFixed(2)), // Convert bytes to GB
      use: drive.use,
    };
  });

  const systeminformation: SystemInformation = {
    uptime: {
      hours: (await getUptimeService()).hours,
      minutes: (await getUptimeService()).minutes,
    },
    cpu: {
      manufacturer: cpu.manufacturer,
      brand: cpu.brand,
      speed: cpu.speed,
      cores: cpu.cores,
      physicalCores: cpu.physicalCores,
    },
    os: {
      platform: os.platform,
      distro: os.distro,
      release: os.release,
    },
    ram: {
      total: parseFloat((ram.total / 1024 ** 3).toFixed(2)), // Convert bytes to GB
      free: parseFloat((ram.free / 1024 ** 3).toFixed(2)), // Convert bytes to GB
      used: parseFloat((ram.used / 1024 ** 3).toFixed(2)), // Convert bytes to GB
    },
    hardDrives: hardDrivesInfo,
  };

  return systeminformation;
}

export async function getUptimeService() {
  const uptime = si.time().uptime;

  if (!uptime) {
    throw new Error("Could not get uptime");
  }

  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor(uptime / 60);
  return { hours, minutes };
}
