import { Request, Response } from "express";
import { getStatusService, getUptimeService } from "../services/service.server";


export async function getStatusController(req: Request, res: Response) {
    try {
        const status = await getStatusService();
        res.json({ status });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export async function getServerUptimeController(req: Request, res: Response) {
    try {

        const uptime = await getUptimeService();
        console.log(uptime);
        res.json({ uptime });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}