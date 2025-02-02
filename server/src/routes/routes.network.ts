import express from 'express';

const routes = express.Router();


routes.get("/devices", (req, res) => {
    res.send("List of devices");
});

routes.get("/devices/:ip", (req, res) => {
    res.send(`Device with IP ${req.params.ip}`);
});


