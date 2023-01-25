import { Router } from 'express';
import { getProducts } from '../services/product.service.js';

const viewsRouter = Router();

viewsRouter.get("/products", async (req, res) => {
    const page = req.query.page ? req.query.page : 1;
    const products = await getProducts({},{limit: 10, page: page, lean: true});
    res.render("home", { ...products });
});

export default viewsRouter;