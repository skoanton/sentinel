import express from 'express';
import dotenv from 'dotenv';
import serverRoutes from './routes/routes.server';
import dockerRoutes from './routes/routes.docker';
import weatherRoutes from './routes/routes.weather';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use("/api/server", serverRoutes);
app.use("/api/docker", dockerRoutes);
app.use("/api/weather", weatherRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});