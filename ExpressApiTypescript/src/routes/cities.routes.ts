import { Router } from 'express';

const citiesRoutes = Router();

let cities: any[] = [];

// /GET
citiesRoutes.get('/', (req, res) => {
  return res.json(cities);
});

// /POST
citiesRoutes.post('/', (req, res) => {
  const city = req.body;
  cities.push(city);
  return res.json(city);
});

export default citiesRoutes;
