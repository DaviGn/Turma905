import { PrismaClient, User } from '@prisma/client';

import { UserDto } from '../../domain/dtos/user';

const prisma = new PrismaClient();

export class UpdateUserUseCase {
  constructor() {}

  async handle({ id, name, email, cityId }: UserDto): Promise<User> {
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
}
