import express from "express";
import { getAllNetworkInterfacesController } from "../controllers/controller.network";
const routes = express.Router();

routes.get("/devices", getAllNetworkInterfacesController);

routes.get("/devices/:ip", (req, res) => {
  res.send(`Device with IP ${req.params.ip}`);
});

export default routes;
