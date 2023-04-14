import * as CartController from '../controllers/cart.controller.js';
import { userRole } from '../middlewares/roles.middleware.js';
import passport from '../utils/passport.util.js';
import CustomError from '../utils/customError.js';
import { CARTS_UNAUTHENTICATED } from '../constants/constants.js';
import { ERRORS } from '../constants/errors.js';
import { Router } from "express";

const cartsRouter = Router();

cartsRouter.all("/unauthenticated", () => { throw CustomError.createError(ERRORS.MISSING_INVALID_TOKEN) });
cartsRouter.get("/", CartController.getCarts);
cartsRouter.get("/:cid", CartController.getCart);
cartsRouter.post("/", CartController.createCart);
cartsRouter.post("/:cid/products/:pid", passport.authenticate('current', { session: false, failureRedirect: CARTS_UNAUTHENTICATED }), 
                                            userRole, CartController.addProductToCart);
cartsRouter.put("/:cid/products/:pid", CartController.updateProductQty);
cartsRouter.put("/:cid", CartController.updateCart);
cartsRouter.delete("/:cid/products/:pid", CartController.deleteProduct);
cartsRouter.delete("/:cid", CartController.deleteProducts);
cartsRouter.get("/:cid/purchase", passport.authenticate('current', { session: false, failureRedirect: CARTS_UNAUTHENTICATED }), 
                                            userRole, CartController.purchase);

export default cartsRouter;