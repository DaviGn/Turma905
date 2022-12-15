import { IPresenter } from './IPresenter';

export class SuccessPresenter implements IPresenter {
  statusCode: number = 200;
  response: any;

  constructor(response: any) {
    this.response = response;
  }
}
