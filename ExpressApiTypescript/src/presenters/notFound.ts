import { IPresenter } from './IPresenter';

export class NotFoundPresenter implements IPresenter {
  statusCode: number = 404;
  response: any;

  constructor(response: any) {
    this.response = response;
  }
}
