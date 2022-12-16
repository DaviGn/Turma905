import { IPresenter, NotFoundPresenter, SuccessPresenter } from '@presenters';
import { CityDto } from '@domain/dtos/city';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UpdateCityUseCase {
  constructor() {}

  async handle(city: CityDto): Promise<IPresenter> {
    const cityExist = await this.checkIfCityExists(city.id);

    if (!cityExist) {
      return new NotFoundPresenter({ message: 'City not found!' });
    }

    const updatedCity = await prisma.city.update({
      data: city,
      where: { id: city.id },
    });
    return new SuccessPresenter(updatedCity);
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
