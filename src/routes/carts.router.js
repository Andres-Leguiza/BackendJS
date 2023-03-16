import * as CartController from '../controllers/cart.controller.js';
import { userRole } from '../middlewares/roles.middleware.js';
import passport from '../utils/passport.util.js';
import { STATUS, MISSING_INVALID_TOKEN } from '../constants/constants.js';
import { Router } from "express";

const cartsRouter = Router();

cartsRouter.get("/unauthenticated", (req, res) => {
    res.status(401).json({
        message: MISSING_INVALID_TOKEN,
        status: STATUS.FAILED
    });
});

cartsRouter.get("/", CartController.getCarts);
cartsRouter.get("/:cid", CartController.getCart);
cartsRouter.post("/", CartController.createCart);
cartsRouter.post("/:cid/products/:pid", passport.authenticate('current', { session: false, failureRedirect: '/api/carts/unauthenticated' }), 
                                            userRole, CartController.addProductToCart);
cartsRouter.put("/:cid/products/:pid", CartController.updateProductQty);
cartsRouter.put("/:cid", CartController.updateCart);
cartsRouter.delete("/:cid/products/:pid", CartController.deleteProduct);
cartsRouter.delete("/:cid", CartController.deleteProducts);

export default cartsRouter;