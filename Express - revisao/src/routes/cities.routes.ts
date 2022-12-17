import { Router } from 'express';

import {
  listCities,
  getCity,
  createCity,
} from '../controllers/cities.controllers';

const citiesRoutes = Router();

citiesRoutes.get('/', listCities);
citiesRoutes.get('/:id', getCity);
citiesRoutes.post('/', createCity);

export default citiesRoutes;
