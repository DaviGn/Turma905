import { IPresenter, NotFoundPresenter, DeletedPresenter } from '@presenters';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DeleteCityUseCase {
  constructor() {}

  async handle(id: number): Promise<IPresenter> {
    const cityExist = await this.checkIfCityExists(id);

    if (!cityExist) {
      return new NotFoundPresenter({ message: 'City not found!' });
    }

    await prisma.city.delete({
      where: {
        id: id,
      },
    });
    return new DeletedPresenter();
  }

  private async checkIfCityExists(id: number): Promise<boolean> {
    const existingCity = await prisma.city.findFirst({
      where: {
        id: id,
      },
    });
    const cityExist = !!existingCity;
    return cityExist;

    // If want to validate through exception
    // if (!cityExist) {
    //   throw new NotFoundException('City not found!');
    // }
  }
}
