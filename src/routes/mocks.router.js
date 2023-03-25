import { Router }  from "express";
import { mockProducts } from "../controllers/mock.controller.js";

const mocksRouter = Router();

mocksRouter.get("/mockingproducts", mockProducts);

export default mocksRouter;