import express from 'express';

const routes = express.Router();

routes.get('/weather/:city', (req, res) => {
    res.send(`Weather for city ${req.params.city}`);
});

routes.post('/weather/:city', (req, res) => {
    res.send(`Weather for city ${req.params.city}`);
});

export default routes;