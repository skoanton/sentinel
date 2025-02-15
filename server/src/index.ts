import "tsconfig-paths/register";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import serverRoutes from "./routes/routes.server";
import dockerRoutes from "./routes/routes.docker";
import networkRoutes from "./routes/routes.network";
import weatherRoutes from "./routes/routes.weather";
import roombaRoutes from "./routes/routes.roomba";
import { connectRoomba } from "./services/service.roomba";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/api/server", serverRoutes);
app.use("/api/network", networkRoutes);
app.use("/api/docker", dockerRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/roomba", roombaRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

connectRoomba();
