import { PrismaClient, User } from '@prisma/client';

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

    return user;
  }
}
