import * as ProductController from '../controllers/product.controller.js';
import { adminRole } from '../middlewares/roles.middleware.js';
import passport from '../utils/passport.util.js';
import CustomError from '../utils/customError.js';
import { ERRORS } from '../constants/errors.js';
import { Router }  from "express";

const productsRouter = Router();

productsRouter.get("/unauthenticated", () => { throw CustomError.createError(ERRORS.MISSING_INVALID_TOKEN) });
productsRouter.get("/", ProductController.getProducts);
productsRouter.get("/:pid", ProductController.getProduct);
productsRouter.post("/", passport.authenticate('current', { session: false, failureRedirect: '/api/products/unauthenticated' }), 
                            adminRole, ProductController.addProduct);
productsRouter.put("/:pid", passport.authenticate('current', { session: false, failureRedirect: '/api/products/unauthenticated' }), 
                            adminRole, ProductController.updateProduct);
productsRouter.delete("/:pid", passport.authenticate('current', { session: false, failureRedirect: '/api/products/unauthenticated' }), 
                            adminRole, ProductController.deleteProduct);

export default productsRouter;