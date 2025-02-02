import si from 'systeminformation';

export async function getStatusService() {

    const cpu = await si.cpu();
    const os = await si.osInfo();
    const ram = await si.mem();
    const uptime = await si.time().uptime;

    return {
        cpu: cpu.manufacturer,
        brand: cpu.brand,
        speed: cpu.speed,
        cores: cpu.cores,
        os: os.distro,
        platform: os.platform,
        release: os.release,
        ram: ram.total,
    }

}

export async function getUptimeService() {
    const uptime = si.time().uptime;

    if (!uptime) {
        throw new Error('Could not get uptime');
    }

    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor(uptime / 60);
    return { hours, minutes };
}