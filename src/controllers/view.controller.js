import * as ProductService from '../services/product.service.js';
import * as AuthService from '../services/auth.service.js'
import * as UserService from "../services/user.service.js";
import * as Constants from "../constants/constants.js";
import * as CartService from '../services/cart.service.js';

export async function renderHome(req, res){
    try {
        const page = req.query.page ? req.query.page : 1;
        const products = await ProductService.getProducts({},{limit: 10, page: page, lean: true});
        const user = await UserService.getUser(req.session.userEmail);
        delete user.password;
        const isAdmin = user.role === Constants.ADMIN;
        res.render(Constants.HOME, { ...products, user, isAdmin });
    } catch (error) {
        res.render(Constants.HOME, { error: error.message });
    }
}

export async function getCart(req, res){
    try {
        const { cid } = req.params;
        const cart = await CartService.getCart(cid);
        res.render(Constants.CART, { ...cart });
    } catch (error) {
        res.render(Constants.CART, { error: error.message });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if(email && password ){
        const authenticated = await AuthService.login(email, password);
        if (authenticated) {
            req.session.authenticated = true;
            req.session.userEmail = email;
            res.redirect(Constants.PRODUCTS);
        } else {
            res.render(Constants.LOGIN, { error: Constants.LOGIN_INVALID_USER_PASS_ERROR });
        }
        } else res.render(Constants.LOGIN);
    } catch (error) {
        res.render(Constants.LOGIN, { error: error.message });
    }
}

export async function logout(req, res) {
    try {
        req.session.destroy((error) => {
        if (error) {
            res.render(Constants.LOGIN, { error: error.message });
        } else res.render(Constants.LOGIN, { success: Constants.LOGOUT_SUCCESS });
        });
    } catch (error) {
        res.render(Constants.LOGIN, { error: error.message });
    }
}

export async function register(req, res){
    try {
        res.render(Constants.REGISTRATION);
    } catch (error) {
        res.render(Constants.REGISTRATION, { error: error.message });
    }
}

export async function createUser(req, res) {
    try {
      const data = req.body;
      const user = await UserService.createUser(data);
      req.session.authenticated = true;
      req.session.userEmail = user.email;
      res.redirect(Constants.PRODUCTS);
    } catch (error) {
      res.render(Constants.REGISTRATION, { error: error.message });
    }
}