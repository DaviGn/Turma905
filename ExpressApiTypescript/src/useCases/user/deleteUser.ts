import { PrismaClient } from '@prisma/client';
import { NotFoundException } from 'domain/exceptions/notFound';

const prisma = new PrismaClient();

export class DeleteUserUseCase {
  constructor() {}

  async handle(id: string) {
    // Verificar se o usuário existe
    const userExist = await this.checkIfUserExist(id);

    if (!userExist) {
      throw new NotFoundException('User not found!');
    }

    await prisma.user.delete({
      where: {
        id: id,
      },
    });
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
