import { PrismaClient } from '@prisma/client';
import { IPresenter, NotFoundPresenter, SuccessPresenter } from '@presenters';
import { toCityResponse } from '@maps/city';

const prisma = new PrismaClient();
export class GetCityUseCase {
  constructor() {}

  async handle(id: number): Promise<IPresenter> {
    const city = await prisma.city.findFirst({
      where: {
        id: id,
      },
    });

    if (!city) {
      return new NotFoundPresenter({ message: 'City not found!' });
    }

    const result = toCityResponse(city);
    return new SuccessPresenter(result);
  }
}
