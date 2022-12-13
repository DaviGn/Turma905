import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import { CityDto } from '../domain/dtos/city';

const citiesRoutes = Router();
const prisma = new PrismaClient();

// /GET
citiesRoutes.get('/', async (req: Request, res: Response) => {
  const cities = await prisma.city.findMany();
  return res.json(cities);
});

// /GET
interface GetParams {
  id: string;
}

citiesRoutes.get('/:id', async (req: Request<GetParams>, res: Response) => {
  const { id } = req.params;
  const city = await prisma.city.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!city) {
    return res.status(404).json({
      message: 'City not found',
    });
  }

  return res.json(city);
});

// /POST
citiesRoutes.post('/', async (req: Request<{}, {}, CityDto>, res: Response) => {
  const { name, uf } = req.body;

  const createdCity = await prisma.city.create({
    data: {
      name,
      uf,
    },
  });

  return res.json(createdCity);
});

// /PUT
interface PutParams {
  id: string;
}

citiesRoutes.put(
  '/:id',
  async (req: Request<PutParams, {}, CityDto>, res: Response) => {
    const { id } = req.params;

    const city = await prisma.city.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!city) {
      return res.status(404).json({
        message: 'City not found',
      });
    }

    const { name, uf } = req.body;
    const updatedCity = await prisma.city.update({
      data: {
        name,
        uf,
      },
      where: {
        id: Number(id),
      },
    });

    return res.json(updatedCity);
  }
);

// /DELETE
interface DeleteParams {
  id: string;
}
citiesRoutes.delete(
  '/:id',
  async (req: Request<DeleteParams>, res: Response) => {
    const { id } = req.params;
    const city = await prisma.city.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!city) {
      return res.status(404).json({
        message: 'City not found',
      });
    }

    await prisma.city.delete({
      where: {
        id: Number(id),
      },
    });

    return res.json({
      message: 'City deleted successfully',
    });
  }
);

export default citiesRoutes;
