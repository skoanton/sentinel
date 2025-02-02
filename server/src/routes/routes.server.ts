import exp from "constants";
import express from "express";

const routes = express.Router();

routes.get('/status', (req, res) => {
    res.send("Server is running");
});

routes.get("/uptime", (req, res) => {
    res.send(`Server uptime: ${process.uptime()}`);
});

export default routes;