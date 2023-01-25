import * as ProductController from '../controllers/product.controller.js'
import { Router }  from "express";

const productsRouter = Router();

productsRouter.get("/", ProductController.getProducts);
productsRouter.get("/:pid", ProductController.getProduct);
productsRouter.post("/", ProductController.addProduct);
productsRouter.put("/:pid", ProductController.updateProduct);
productsRouter.delete("/:pid", ProductController.deleteProduct);

export default productsRouter;