import { PrismaClient, User } from '@prisma/client';
import { NotFoundException } from 'domain/exceptions/notFound';

const prisma = new PrismaClient();

export class GetUserUseCase {
  constructor() {}

  async handle(id: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
      include: {
        city: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }
}
