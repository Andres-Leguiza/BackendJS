import { Router } from 'express';
import { getCart } from '../services/cart.service.js';
import { getProducts } from '../services/product.service.js';

const viewsRouter = Router();

viewsRouter.get("/products", async (req, res) => {
    const page = req.query.page ? req.query.page : 1;
    const products = await getProducts({},{limit: 10, page: page, lean: true});
    res.render("home", { ...products });
});

viewsRouter.get("/carts/:cid", async (req, res) => {
    const { cid } = req.params;
    const cart = await getCart(cid);
    res.render("cart", { ...cart });
});

export default viewsRouter;