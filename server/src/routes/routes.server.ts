import express from "express";
import { getStatusController, getServerUptimeController } from "../controllers/controller.server";

const routes = express.Router();

routes.get('/status', getStatusController);

routes.get("/uptime", getServerUptimeController);

export default routes;