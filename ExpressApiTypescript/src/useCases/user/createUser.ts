import { v4 } from 'uuid';
import { PrismaClient, User } from '@prisma/client';
import { crypt } from '@services/crypto';

import { UserDto } from '@domain/dtos/user';

const prisma = new PrismaClient();

export class CreateUserUseCase {
  constructor() {}

  async handle(user: Omit<UserDto, 'id'>): Promise<User> {
    const hashed = crypt(user.password);

    const createdUser = await prisma.user.create({
      data: {
        id: v4(),
        name: user.name,
        email: user.email,
        cityId: user.cityId,
        password: hashed.hash,
        salt: hashed.salt,
      },
    });

    return createdUser;
  }
}
