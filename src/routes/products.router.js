import * as ProductController from '../controllers/product.controller.js';
import { handleRoles } from '../middlewares/roles.middleware.js';
import passport from '../utils/passport.util.js';
import CustomError from '../utils/customError.js';
import { ADMIN, PREMIUM, PRODUCTS_UNAUTHENTICATED } from '../constants/constants.js';
import { ERRORS } from '../constants/errors.js';
import { Router }  from "express";

const productsRouter = Router();

productsRouter.all("/unauthenticated", () => { throw CustomError.createError(ERRORS.MISSING_INVALID_TOKEN) });
productsRouter.get("/", ProductController.getProducts);
productsRouter.get("/:pid", ProductController.getProduct);
productsRouter.post("/", passport.authenticate('current', { session: false, failureRedirect: PRODUCTS_UNAUTHENTICATED }), 
                            handleRoles([ADMIN, PREMIUM]), ProductController.addProduct);
productsRouter.put("/:pid", passport.authenticate('current', { session: false, failureRedirect: PRODUCTS_UNAUTHENTICATED }), 
                            handleRoles([ADMIN, PREMIUM]), ProductController.updateProduct);
productsRouter.delete("/:pid", passport.authenticate('current', { session: false, failureRedirect: PRODUCTS_UNAUTHENTICATED }), 
                            handleRoles([ADMIN, PREMIUM]), ProductController.deleteProduct);

export default productsRouter;