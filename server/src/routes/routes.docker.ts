import express from "express";

const routes = express.Router();

routes.get("/docker/containers", (req, res) => {
  res.send("Docker container is running");
});

routes.get("/docker/containers/:id", (req, res) => {
  res.send(`Docker container with id ${req.params.id} is running`);
});

routes.get("/docker/containers/:id/start", (req, res) => {
  res.send(`Docker container with id ${req.params.id} is starting`);
});

routes.get("/docker/containers/:id/stop", (req, res) => {
  res.send(`Docker container with id ${req.params.id} is stopping`);
});

routes.get("/docker/logs/:id", (req, res) => {
  res.send(`Docker container logs for id ${req.params.id}`);
});

export default routes;
