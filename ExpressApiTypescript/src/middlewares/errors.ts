import { IException } from 'domain/exceptions/iException';
import { Request, Response, NextFunction } from 'express';

function isIException(obj: any): obj is IException {
  return 'statusCode' in obj && 'message' in obj;
}

export default function errorsMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);

  if (isIException(err)) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.json({
    message: 'Ops! Ocorreu um erro',
  });
}
