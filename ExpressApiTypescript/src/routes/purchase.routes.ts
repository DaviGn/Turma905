import { Router, Request, Response } from 'express';
import { v4 } from 'uuid';
import { PrismaClient } from '@prisma/client';

const purchaseRoutes = Router();

interface PurchaseItemDto {
  productId: string;
  qtd: number;
}

interface PurchaseDto {
  userId: string;
  items: PurchaseItemDto[];
}

const prisma = new PrismaClient();

purchaseRoutes.post(
  '',
  async (req: Request<{}, {}, PurchaseDto>, res: Response) => {
    const purchase = req.body;

    // Pesquisar os produtos comprados
    // let totalValue = 0;
    // for (let i = 0; i < purchase.items.length; i++) {
    //   const item = purchase.items[i];

    //   const product = await prisma.product.findFirst({
    //     where: {
    //       id: item.productId,
    //     },
    //   });

    //   if (!product) continue;

    //   totalValue += Number(product.unitValue) * item.qtd;
    // }

    const productsIds = purchase.items.map((x) => x.productId);
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productsIds,
        },
      },
    });

    // Calculando valor total
    let totalValue = 0;
    for (let i = 0; i < purchase.items.length; i++) {
      const item = purchase.items[i];

      // Obter o produto do array acima
      const product = products.find((x) => x.id == item.productId);

      if (!product) continue;

      totalValue += Number(product.unitValue) * item.qtd;
    }

    const purchaseId = v4();

    // Salvar a compra
    await prisma.purchase.create({
      data: {
        id: purchaseId,
        userId: purchase.userId,
        totalValue: totalValue,
      },
    });

    // Salvar os itens da compra
    for (let i = 0; i < purchase.items.length; i++) {
      const item = purchase.items[i];
      const product = products.find((x) => x.id == item.productId);

      if (!product) continue;

      await prisma.purchaseItems.create({
        data: {
          purchaseId: purchaseId,
          productId: item.productId,
          qtd: item.qtd,
          unitValue: product?.unitValue,
        },
      });
    }

    return res.json({ message: 'OK' });
  }
);

export default purchaseRoutes;
