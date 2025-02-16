import express, { Request, Response } from "express";
import { getWeather } from "../services/service.weather";

const routes = express.Router();

routes.get("/", async (req: Request, res: Response) => {
  try {
    const weather = await getWeather();

    res.status(200).json(weather);
  } catch (error: any) {
    console.error("Error fetching weather:", error);
    res.status(500).json({ error: error.message });
  }
});

routes.post("/weather/:city", (req, res) => {
  res.send(`Weather for city ${req.params.city}`);
});

export default routes;
