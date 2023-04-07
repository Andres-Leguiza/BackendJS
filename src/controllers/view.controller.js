import * as ProductService from '../services/productDAOs/product.service.js';
import * as AuthService from '../services/auth/auth.service.js'
import * as UserService from "../services/userDAOs/user.service.js";
import * as CartService from '../services/cartDAOs/cart.service.js';
import factory from '../services/factory.js';
import config from '../config/config.js';
import nodemailer from 'nodemailer';
import { generateToken } from './../utils/jwt.util.js';
import * as Constants from "../constants/constants.js";
import logger from '../utils/logger.js';
import { ERRORS } from '../constants/errors.js';

export async function renderHome(req, res){
    try {
        const page = req.query.page ? req.query.page : 1;
        const products = await ProductService.getProducts({},{limit: 10, page: page, lean: true});
        const user = await UserService.getUser(req.session.userEmail);
        delete user.password;
        const isAdmin = user.role === Constants.ADMIN;
        res.render(Constants.HOME, { ...products, user, isAdmin });
    } catch (error) {
        logger.error(ERRORS.UNHANDLED_ERROR, error.message, user?.email);
        res.render(Constants.HOME, { error: error.message });
    }
}

export async function getCart(req, res){
    try {
        const { cid } = req.params;
        const cart = await CartService.getCart(cid);
        res.render(Constants.CART, { ...cart });
    } catch (error) {
        logger.error(ERRORS.UNHANDLED_ERROR, error.message);
        res.render(Constants.CART, { error: error.message });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if(email && password ){
        const authenticated = await AuthService.login(email, password);
        if (authenticated) {
            req.headers("Authorization", "Bearer "+token)
            req.session.authenticated = true;
            req.session.userEmail = email;
            res.redirect(Constants.PRODUCTS);
        } else {
            logger.warning(ERRORS.LOGIN_INVALID_PASS, null, email);
            res.render(Constants.LOGIN, { error: ERRORS.LOGIN_INVALID_PASS.message });
        }
        } else res.render(Constants.LOGIN);
    } catch (error) {
        logger.error(ERRORS.UNHANDLED_ERROR, error.message);
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
        logger.error(ERRORS.UNHANDLED_ERROR, error.message);
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

export async function passwordRecovery(req, res){
    const fromEmail = false;
    const user = {email: "pepe.test@email.com"};
    try {
        res.render(Constants.PASSWORD_RECOVERY, { fromEmail, user });
    } catch (error) {
        res.render(Constants.PASSWORD_RECOVERY, { error: error.message });
    }
}

export async function passwordRecoveryEmail(req, res){
    const { email } = req.body;
    const transport = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        auth: {
            user: config.mailer_user,
            pass: config.mailer_secret
        }
    });
    try {
        const user = await factory.user.getUser(email);
        const token = generateToken(user);
        let emailToSend = await transport.sendMail({
            from: `eCommerce Coder <${config.mailer_user}>`,
            to: `strato_andres@hotmail.com`,
            subject: 'Password Recovery',
            html: `<h2>Hi ${user.first_name} ${user.last_name},</h2>
            <p>A request to recover your password has been detected. 
            Please follow this link if you want to change your password:</p>
            <button style="color: white; background-color: DodgerBlue; padding: 10px 5px; 
            border: 2px solid; border-radius: 10px; cursor: pointer;">Change Password</button>`
        });
        res.render(Constants.PASSWORD_RECOVERY, { user });
    } catch (error) {
        res.render(Constants.PASSWORD_RECOVERY, { error: error.message });
    }
}

export async function updatePassword(req, res){
    const { email } = req.params;
    const { newPassword } = req.body;
    try {
        const user = await factory.user.updateUser(email, { password: newPassword }, true);
        res.render(Constants.PASSWORD_RECOVERY, { fromEmail: false, user });
      } catch (error) {
        res.render(Constants.PASSWORD_RECOVERY, { error: error.message });
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