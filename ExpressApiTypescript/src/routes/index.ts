import { Router } from 'express';

import userRoutes from './users.routes';
import citiesRoutes from './cities.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/cities', citiesRoutes);

export default routes;
