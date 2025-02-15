import { Request, Response } from "express";
import { getAllNetworkInterfacesService } from "../services/service.network";

export async function getAllNetworkInterfacesController(req: Request, res: Response) {
    try {
        const networkInterfaces = await getAllNetworkInterfacesService();
        res.json(networkInterfaces);

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
} 