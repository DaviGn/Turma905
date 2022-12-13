import { v4 } from 'uuid';
import { PrismaClient, User } from '@prisma/client';

import { UserDto } from '../../domain/dtos/user';

const prisma = new PrismaClient();

export class CreateUserUseCase {
  constructor() {}

  async handle(user: Omit<UserDto, 'id'>): Promise<User> {
    const createdUser = await prisma.user.create({
      data: {
        id: v4(),
        name: user.name,
        email: user.email,
        cityId: user.cityId,
      },
    });

    return createdUser;
  }
}
