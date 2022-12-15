import { Router } from 'express';
import { validationsMiddleware } from '@middlewares/validations';
import {
  listCities,
  getCity,
  createCity,
  // updateCity,
  // deleteCity,
} from '@controllers/city';

import {
  createCityValidations,
  updateCityValidations,
  cityIdValidation,
} from '@validators/city';

const citiesRoutes = Router();

citiesRoutes.get('/', listCities);
citiesRoutes.get('/:id', getCity);
citiesRoutes.post(
  '/',
  createCityValidations,
  validationsMiddleware,
  createCity
);
// citiesRoutes.put(
//   '/:id',
//   updateCityValidations,
//   validationsMiddleware,
//   updateCity
// );
// citiesRoutes.delete(
//   '/:id',
//   cityIdValidation,
//   validationsMiddleware,
//   deleteCity
// );

export default citiesRoutes;
