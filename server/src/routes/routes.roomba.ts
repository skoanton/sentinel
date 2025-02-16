import express, { Request, Response, Router } from "express";
import {
  getAllRoombasDb,
  getTotalStatisticsByIdDb,
  getTotalStatisticsDb,
} from "../db/roomba.db";

const routes = express.Router();

routes.get("/all", async (req: Request, res: Response): Promise<any> => {
  try {
    const roombas = await getAllRoombasDb();
    if (!roombas || roombas.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "No Roombas found", data: [] });
    }

    res.status(200).json(roombas);
  } catch (error: any) {
    console.error("Error fetching Roombas:", error);
    res.status(500).json({ error: error.message });
  }
});

routes.get("/statistics", async (req: Request, res: Response): Promise<any> => {
  try {
    const statistics = await getTotalStatisticsDb();
    if (!statistics) {
      return res
        .status(200)
        .json({ success: true, message: "No statistics found", data: [] });
    }

    res.status(200).json(statistics);
  } catch (error: any) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

routes.get(
  "/statistics/:id",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const roombaId = req.params.id;

      if (!roombaId) {
        throw new Error("Roomba ID is required");
      }

      const statistics = await getTotalStatisticsByIdDb(roombaId);
      if (!statistics) {
        return res
          .status(200)
          .json({ success: true, message: "No statistics found", data: [] });
      }

      res.status(200).json(statistics);
    } catch (error: any) {
      console.error("Error fetching statistics:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

export default routes;
