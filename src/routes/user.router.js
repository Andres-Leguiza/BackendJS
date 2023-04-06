import { Router } from "express";
import * as UserController from "../controllers/user.controller.js";
import { apiAuth } from "../middlewares/authToken.middleware.js";

const userRouter = new Router();

userRouter.post("/", UserController.createUser);
userRouter.get("/:email", apiAuth, UserController.getUser);
userRouter.put("/:email", apiAuth, UserController.updateUser);
userRouter.put("/password/:email", apiAuth, UserController.updatePassword);

export default userRouter;