
import express from 'express';


const routes = express.Router();

routes.get('/roomba/status', (req, res) => {
    res.send("Roomba is running");
});

routes.post("/start", (req, res) => {
    res.send(`Roomba is starting`);
});

routes.post("/stop", (req, res) => {
    res.send(`Roomba is stopping`);
});
