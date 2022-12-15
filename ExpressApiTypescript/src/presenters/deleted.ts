import { IPresenter } from './IPresenter';

export class DeletedPresenter implements IPresenter {
  statusCode: number = 204;
  response: any;

  constructor(response?: any) {
    if (response) this.response = response;
  }
}
