import { Request, Response, NextFunction, Router } from 'express';
import { CatalogService } from '../services/catalog.service';
import { CatalogRepository } from '../repository/catalog.repository';

const router = Router();

const catalogService = new CatalogService(new CatalogRepository());

router.post('/products', async (req: Request, res: Response, next: NextFunction) => {
    const data = await catalogService.createProduct(req.body);
    res.status(201).json(data);
});


export default router;