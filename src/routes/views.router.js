import { Router } from 'express';
import { auth } from '../middlewares/authToken.middleware.js';
import * as ViewsController from '../controllers/view.controller.js';
import * as GithubController from '../controllers/github.controller.js';
import { handleRolesForView } from '../middlewares/roles.middleware.js';
import { PREMIUM, USER } from '../constants/constants.js';

const viewsRouter = Router();

viewsRouter.get("/products", auth, ViewsController.renderHome);
viewsRouter.get("/carts/:cid", auth, ViewsController.getCart);
viewsRouter.post("/carts/:cid/products/:pid", auth, handleRolesForView([USER, PREMIUM]), ViewsController.addProductToCart);
viewsRouter.get("/carts/:cid/purchase", auth, handleRolesForView([USER, PREMIUM]), ViewsController.purchase);
viewsRouter.get("/login", ViewsController.login);
viewsRouter.post("/login", ViewsController.login);
viewsRouter.get("/logout", ViewsController.logout);
viewsRouter.get("/register", ViewsController.register);
viewsRouter.post("/register", ViewsController.createUser);
viewsRouter.get("/passwordRecovery", ViewsController.passwordRecovery);
viewsRouter.post("/passwordRecovery", ViewsController.passwordRecoveryEmail);
viewsRouter.post("/updatePassword/:email", ViewsController.updatePassword);
viewsRouter.get('/github/fail', GithubController.renderFailure);

export default viewsRouter;