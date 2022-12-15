// import { inject, injectable } from 'tsyringe';

// import { ICityRepository } from '@repositories/city';
// import { IPresenter, NotFoundPresenter, SuccessPresenter } from '@presenters';
// import { UpdateCityRequest } from '@request/city';

// @injectable()
// export class UpdateCityUseCase {
//   constructor(@inject('CityRepository') private repository: ICityRepository) {}

//   async handle(city: UpdateCityRequest & { id: number }): Promise<IPresenter> {
//     const cityExist = await this.checkIfCityExists(city.id);

//     if (!cityExist) {
//       return new NotFoundPresenter({ message: 'City not found!' });
//     }

//     const updatedCity = await this.repository.update(city);
//     return new SuccessPresenter(updatedCity);
//   }

//   private async checkIfCityExists(id: number): Promise<boolean> {
//     const existingCity = await this.repository.findById(id);
//     const cityExist = !!existingCity;
//     return cityExist;

//     // If want to validate through exception
//     // if (!cityExist) {
//     //   throw new NotFoundException('City not found!');
//     // }
//   }
// }
