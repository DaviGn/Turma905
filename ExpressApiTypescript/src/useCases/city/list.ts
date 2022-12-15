import { IPresenter } from 'presenters/IPresenter';
import { PrismaClient } from '@prisma/client';
import { SuccessPresenter } from '@presenters';
import { toCityResponse } from '@maps/city';

const prisma = new PrismaClient();
export class ListCitiesUseCase {
  constructor() {}

  async handle(): Promise<IPresenter> {
    const cities = await prisma.city.findMany();
    const citiesResponse = cities.map((city) => toCityResponse(city));
    return new SuccessPresenter(citiesResponse);
  }
}
