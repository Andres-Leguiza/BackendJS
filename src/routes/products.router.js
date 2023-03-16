import * as ProductController from '../controllers/product.controller.js';
import { adminRole } from '../middlewares/roles.middleware.js';
import passport from '../utils/passport.util.js';
import { STATUS, MISSING_INVALID_TOKEN } from '../constants/constants.js';
import { Router }  from "express";

const productsRouter = Router();

productsRouter.get("/unauthenticated", (req, res) => {
    res.status(401).json({
        message: MISSING_INVALID_TOKEN,
        status: STATUS.FAILED
    });
});

productsRouter.get("/", ProductController.getProducts);
productsRouter.get("/:pid", ProductController.getProduct);
productsRouter.post("/", passport.authenticate('current', { session: false, failureRedirect: '/api/products/unauthenticated' }), 
                            adminRole, ProductController.addProduct);
productsRouter.put("/:pid", passport.authenticate('current', { session: false, failureRedirect: '/api/products/unauthenticated' }), 
                            adminRole, ProductController.updateProduct);
productsRouter.delete("/:pid", passport.authenticate('current', { session: false, failureRedirect: '/api/products/unauthenticated' }), 
                            adminRole, ProductController.deleteProduct);

export default productsRouter;