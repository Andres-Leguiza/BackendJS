import * as CartController from '../controllers/cart.controller.js' 
import { Router } from "express";

const cartsRouter = Router();

cartsRouter.get("/", CartController.getCarts);
cartsRouter.get("/:cid", CartController.getCart);
cartsRouter.post("/", CartController.createCart);
cartsRouter.post("/:cid/product/:pid", CartController.addProductToCart);

export default cartsRouter;