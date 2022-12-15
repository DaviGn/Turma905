import { IException } from './iException';

export class UnathorizedException implements IException {
  statusCode: number = 401;
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
