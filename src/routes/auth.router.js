import { Router } from "express";
import * as AuthController from "../controllers/auth.controller.js";

const authRouter = new Router();

authRouter.post("/login", AuthController.apiLogin);
authRouter.get("/logout", AuthController.apiLogout);

export default authRouter;