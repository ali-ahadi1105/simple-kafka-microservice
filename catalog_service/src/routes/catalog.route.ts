import { Request, Response, NextFunction, Router } from 'express';

const router = Router();

router.post('/product', (req: Request, res: Response, next: NextFunction) => {
    res.status(201).json({});
});


export default router;