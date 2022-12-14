import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seed() {
  await prisma.city.upsert({
    create: {
      name: 'Santo André',
      uf: 'SP',
    },
    update: {},
    where: { id: 1 },
  });

  await prisma.brand.upsert({
    create: {
      id: 1,
      name: 'Nike',
    },
    update: {},
    where: { id: 1 },
  });

  await prisma.product.upsert({
    create: {
      id: '30f4df8e-ed99-4056-965a-a8c82beb063d',
      description: 'AirForce 1 All White',
      unitValue: 899,
      qtd: 10,
      brandId: 1,
    },
    update: {},
    where: { id: '30f4df8e-ed99-4056-965a-a8c82beb063d' },
  });

  await prisma.product.upsert({
    create: {
      id: 'ebcadfe7-9407-46e0-af71-e335514b4649',
      description: 'Dunk Low',
      unitValue: 999,
      qtd: 10,
      brandId: 1,
    },
    update: {},
    where: { id: 'ebcadfe7-9407-46e0-af71-e335514b4649' },
  });
}
