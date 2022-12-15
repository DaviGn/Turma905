import { PrismaClient, User } from '@prisma/client';
import { NotFoundException } from 'domain/exceptions/notFound';

import { UserDto } from '../../domain/dtos/user';

const prisma = new PrismaClient();

export class UpdateUserUseCase {
  constructor() {}

  async handle({ id, name, email, cityId }: UserDto): Promise<User> {
    // Verificar se o usuário existe
    const userExist = await this.checkIfUserExist(id);

    if (!userExist) {
      throw new NotFoundException('User not found!');
    }

    const updatedUser = await prisma.user.update({
      data: {
        name,
        email,
        cityId,
      },
      where: {
        id,
      },
    });

    return updatedUser;
  }

  async checkIfUserExist(id: string): Promise<boolean> {
    const user = await prisma.user.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });

    // !!user
    return user !== null;
  }
}
