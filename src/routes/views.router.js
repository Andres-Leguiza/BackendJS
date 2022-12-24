import express from 'express';
import productManager from "../products/ProductManager.js";

const viewsRouter = express.Router();

viewsRouter.get('/', (req, res) => {
    let products = productManager.getProducts();
    res.render('home', { products });
});

viewsRouter.get('/realtimeproducts', (req, res) => {
    let products = productManager.getProducts();
    res.render('realTimeProducts', { products });
});

export default viewsRouter;