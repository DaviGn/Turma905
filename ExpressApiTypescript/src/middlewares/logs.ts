import { Request, Response, NextFunction } from 'express';

export default async function logsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { method, url } = req;
    const trace = `${method} ${url}`;

    console.info(trace);
    console.time();
    await next();
    console.timeEnd();
  } catch (ex) {
    console.log(ex);
  }
}
