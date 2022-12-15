import { IPresenter } from './IPresenter';

export class UnathorizedPresenter implements IPresenter {
  statusCode: number = 401;
  response: any;

  constructor(response: any) {
    this.response = response;
  }
}
