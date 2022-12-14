import { Router } from 'express';

import userRoutes from './users.routes';
import userPhotoRoutes from './userPhoto.routes';
import citiesRoutes from './cities.routes';
import purchaseRoutes from './purchase.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/userPhoto', userPhotoRoutes);
routes.use('/cities', citiesRoutes);
routes.use('/purchase', purchaseRoutes);

export default routes;
