import express from "express";
import {
  getSystemInformationController,
  getServerUptimeController,
} from "../controllers/controller.server";

const routes = express.Router();

routes.get("/information", getSystemInformationController);
routes.get("/uptime", getServerUptimeController);

export default routes;
