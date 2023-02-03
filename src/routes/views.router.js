import { Router } from 'express';
import { auth } from '../middlewares/auth.middleware.js';
import { getCart } from '../services/cart.service.js';
import { getProducts } from '../services/product.service.js';
import { login, logout } from "../controllers/auth.controller.js";
import { getUser } from '../services/user.service.js';
import { createUserFromForm } from '../controllers/user.controller.js';

const viewsRouter = Router();

viewsRouter.get("/products", auth, async (req, res) => {
    const page = req.query.page ? req.query.page : 1;
    const products = await getProducts({},{limit: 10, page: page, lean: true});
    const user = await getUser(req.session.userEmail);
    delete user.password;
    res.render("home", { ...products, user });
});

viewsRouter.get("/carts/:cid", auth, async (req, res) => {
    const { cid } = req.params;
    const cart = await getCart(cid);
    res.render("cart", { ...cart });
});

viewsRouter.get("/login", login);
viewsRouter.post("/login", login);
viewsRouter.get("/logout", logout);
viewsRouter.get("/register", async (req, res) => {res.render("registration")});
viewsRouter.post("/register", createUserFromForm);

export default viewsRouter;