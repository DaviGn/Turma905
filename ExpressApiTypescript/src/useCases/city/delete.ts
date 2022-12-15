// import { inject, injectable } from 'tsyringe';

// import { ICityRepository } from '@repositories/city';
// import { IPresenter, NotFoundPresenter, DeletedPresenter } from '@presenters';

// @injectable()
// export class DeleteCityUseCase {
//   constructor(@inject('CityRepository') private repository: ICityRepository) {}

//   async handle(id: number): Promise<IPresenter> {
//     const cityExist = await this.checkIfCityExists(id);

//     if (!cityExist) {
//       return new NotFoundPresenter({ message: 'City not found!' });
//     }

//     await this.repository.delete(id);
//     return new DeletedPresenter();
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
