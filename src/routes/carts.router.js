import * as CartController from '../controllers/cart.controller.js'
import { Router } from "express";

const cartsRouter = Router();

cartsRouter.get("/", CartController.getCarts);
cartsRouter.get("/:cid", CartController.getCart);
cartsRouter.post("/", CartController.createCart);
cartsRouter.post("/:cid/products/:pid", CartController.addProductToCart);
cartsRouter.put("/:cid/products/:pid", CartController.updateProductQty);
cartsRouter.put("/:cid", CartController.updateCart);
cartsRouter.delete("/:cid/products/:pid", CartController.deleteProduct);
cartsRouter.delete("/:cid", CartController.deleteProducts);

export default cartsRouter;