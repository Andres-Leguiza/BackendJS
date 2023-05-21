import { Router } from "express";
import * as UserController from "../controllers/user.controller.js";
import { apiAuth } from "../middlewares/authToken.middleware.js";

const userRouter = new Router();

userRouter.get("/", UserController.getUsers);
userRouter.post("/", UserController.createUser);
userRouter.get("/:email", apiAuth, UserController.getUser);
userRouter.get("/premium/:uid", apiAuth, UserController.changeRole);
userRouter.put("/:email", apiAuth, UserController.updateUser);
userRouter.put("/password/:email", apiAuth, UserController.updatePassword);
userRouter.delete("/:email", UserController.deleteUser);
userRouter.delete("/", UserController.deleteUsers);

export default userRouter;