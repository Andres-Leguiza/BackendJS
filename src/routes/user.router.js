import { Router } from "express";
import * as UserController from "../controllers/user.controller.js";
import { apiAuth } from "../middlewares/auth.middleware.js";

const userRouter = new Router();

userRouter.post("/", UserController.createUser);
userRouter.get("/:email", apiAuth, UserController.getUser);

export default userRouter;