import { Router } from "express";
import * as UserController from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const userRouter = new Router();

userRouter.post("/", UserController.createUser);
userRouter.get("/:email", auth, UserController.getUser);

export default userRouter;