import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export class ListUsersUseCase {
  constructor() {}

  async handle(): Promise<User[]> {
    const users = await prisma.user.findMany({
      include: {
        city: true,
      },
    });

    return users;
  }
}
