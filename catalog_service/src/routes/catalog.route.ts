import express, { Request, Response, NextFunction, Router } from 'express';
import { CatalogService } from '../services/catalog.service';
import { CatalogRepository } from '../repository/catalog.repository';
import { RequestValidator } from '../utils/requestValidator';
import { CreateProductRequest } from '../dto/product.dto';

const router: Router = express.Router();

export const catalogService = new CatalogService(new CatalogRepository());

router.post('/products', async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const {errors, input} = await RequestValidator(req.body, CreateProductRequest);
        if (errors) {
            res.status(400).json(errors);
        } else {
            const data = await catalogService.createProduct(input);
            res.status(201).json(data);
        }
    } catch (error) {
        const err = error as Error;
        res.status(500).json(err.message);
    }
});


export default router;