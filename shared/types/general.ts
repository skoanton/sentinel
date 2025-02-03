export type SystemInformation = {
    uptime: {
        hours: number,
        minutes: number
    },
    cpu: {
        manufacturer: string,
        brand: string,
        speed: number,
        cores: number,
        physicalCores: number
    },
    os: {
        platform: string,
        distro: string,
        release: string
    },
    ram: {
        total: number,
        free: number,
        used: number

    },
    hardDrives: {
        name: string,
        size: number,
        used: number,
        available: number,
        use: number
    }[]

}