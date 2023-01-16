import { Router } from 'express';
import * as ProductController from '../controllers/product.controller.js'

const viewsRouter = Router();

viewsRouter.get('/', () => {
    let products = getProducts;
    res.render('home', { products });
});

viewsRouter.get('/realtimeproducts', ProductController.getRealtimeProducts);

export default viewsRouter;