import { Router } from 'express';
import { validationsMiddleware } from '../middlewares/validations';
import {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '@controllers/user';

import {
  userValidations,
  editUserValidations,
  userIdValidation,
} from '@validators/user';

const userRoutes = Router();

userRoutes.get('/', listUsers);
userRoutes.get('/:id', getUser);
userRoutes.post('/', userValidations, validationsMiddleware, createUser);
userRoutes.put('/:id', editUserValidations, validationsMiddleware, updateUser);
userRoutes.delete('/:id', userIdValidation, validationsMiddleware, deleteUser);

export default userRoutes;
