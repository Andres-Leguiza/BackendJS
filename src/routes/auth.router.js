import { Router } from "express";
import * as AuthController from "../controllers/auth.controller.js";

const authRouter = new Router();

authRouter.post("/login", AuthController.login);

export default authRouter;