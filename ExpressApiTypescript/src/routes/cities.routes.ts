import { Router } from 'express';

const citiesRoutes = Router();

let cities: any[] = [];

// /GET
citiesRoutes.get('/', (req, res) => {
  return res.send(cities);
});

// /POST
citiesRoutes.post('/', (req, res) => {
  const city = req.body;
  cities.push(city);
  return res.send(city);
});

export default citiesRoutes;
