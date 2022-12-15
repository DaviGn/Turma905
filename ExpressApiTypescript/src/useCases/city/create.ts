import { IPresenter, SuccessPresenter } from '@presenters';
import { PrismaClient } from '@prisma/client';
import { CityDto } from '@domain/dtos/city';

const prisma = new PrismaClient();

export class CreateCityUseCase {
  constructor() {}

  async handle(user: Omit<CityDto, 'id'>): Promise<IPresenter> {
    const createdCity = await prisma.city.create({
      data: {
        name: user.name,
        uf: user.uf,
      },
    });

    return new SuccessPresenter(createdCity);
  }
}
