import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import { UserDto } from '../domain/dtos/user';
import { ListUsersUseCase } from '../useCases/user/listUsers';
import { GetUserUseCase } from '../useCases/user/getUser';
import { CreateUserUseCase } from '../useCases/user/createUser';
import { UpdateUserUseCase } from '../useCases/user/updateUser';
import { DeleteUserUseCase } from '../useCases/user/deleteUser';
import { validationResult } from 'express-validator';

const prisma = new PrismaClient();

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export async function listUsers(req: Request, res: Response) {
  const useCase = new ListUsersUseCase();
  const users = await useCase.handle();
  return res.json(users);
}

interface GetParams {
  id: string;
}
export async function getUser(req: Request<GetParams>, res: Response) {
  const { id } = req.params;
  const useCase = new GetUserUseCase();
  const user = await useCase.handle(id);

  if (!user) {
    return res.status(404).json({
      message: 'User not found!',
    });
  }

  return res.send(user);
}

export async function createUser(req: Request<{}, {}, UserDto>, res: Response) {
  const user = req.body;

  const useCase = new CreateUserUseCase();
  const createdUser = await useCase.handle(user);
  return res.json(createdUser);
}

interface PutParams {
  id: string;
}
export async function updateUser(
  req: Request<{ id: string }, {}, Omit<UserDto, 'id'>>,
  res: Response
) {
  const { id } = req.params;
  const userData = req.body;

  const user = await prisma.user.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
  });

  if (!user) {
    // Retornar que não encontrou
    return res.status(404).json({
      message: 'User not found!',
    });
  }

  const useCase = new UpdateUserUseCase();
  const updatedUser = await useCase.handle({
    id,
    ...userData,
  });

  return res.json(updatedUser);
}

interface DeleteParams {
  id: string;
}
export async function deleteUser(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;

  // Procurar se o usuário existe
  const user = await prisma.user.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
  });

  if (!user) {
    return res.status(404).json({
      message: 'User not found!',
    });
  }

  const useCase = new DeleteUserUseCase();
  await useCase.handle(id);

  return res.json({
    message: 'User deleted succeeded!',
  });
}
