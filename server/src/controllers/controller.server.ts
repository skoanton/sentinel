import { Request, Response } from "express";
import {
  getSystemInformationService,
  getUptimeService,
} from "../services/service.server";

export async function getSystemInformationController(
  req: Request,
  res: Response
) {
  try {
    const systeminformation = await getSystemInformationService();
    res.json(systeminformation);
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
