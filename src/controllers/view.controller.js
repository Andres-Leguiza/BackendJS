import * as JWTService from '../services/auth/jwt.service.js';
import factory from '../services/factory.js';
import jwt from 'jsonwebtoken';
import { generateToken } from './../utils/jwt.util.js';
import * as Constants from "../constants/constants.js";
import logger from '../utils/logger.js';
import config from '../config/config.js';
import { ERRORS } from '../constants/errors.js';
import CustomError from '../utils/customError.js';
import EmailSender from './../utils/emailSender.js';
import UserDTO from '../services/userDAOs/userDTO.js';

export async function renderHome(req, res){
    try {
        const page = req.query.page ? req.query.page : 1;
        const products = await factory.product.getProducts({},{limit: 10, page: page, lean: true});
        const user = req.user;
        const isAdmin = user.role === Constants.ADMIN;
        res.render(Constants.HOME, { ...products, user, isAdmin });
    } catch (error) {
        logError(error, req);
        res.render(Constants.HOME, { error: error.message });
    }
}

export async function getCart(req, res){
    try {
        const { cid } = req.params;
        const cart = await factory.cart.getCart(cid);
        res.render(Constants.CART, { ...cart });
    } catch (error) {
        logError(error, req);
        res.render(Constants.CART, { error: error.message });
    }
}

export async function addProductToCart(req, res){
    try {
        const { cid, pid } = req.params;
        const product = await factory.product.getProduct(pid);
        if(!product) throw CustomError.createError(ERRORS.PRODUCT_NOT_FOUND, null, req.user?.email);
        if(product.owner !== Constants.ADMIN && product.owner === req.user?.id) throw CustomError.createError(ERRORS.PRODUCT_OWNERSHIP, null, req.user?.email);
        const cart = await factory.cart.addProductToCart(cid, pid);
        if (!cart) throw CustomError.createError(ERRORS.CART_NOT_FOUND, null, req.user?.email);
        await getCart(req, res);
    } catch (error) {
        logError(error, req);
        res.render(Constants.HOME, { error: error.message });
    }
}

export async function purchase(req, res){
    try {
        const { cid } = req.params;
        const cart = await factory.cart.getCart(cid);
        if (!cart) throw CustomError.createError(ERRORS.CART_NOT_FOUND, null, req.user?.email);
        let amount = 0;
        let unprocessedProducts = [];
        let isItemProccesed = false;
        cart.products.forEach( async cartItem => {
            if(cartItem.quantity <= cartItem.product.stock){
                await factory.product.updateProduct(cartItem.product.id, {"stock": cartItem.product.stock - cartItem.quantity});
                amount += cartItem.product.price;
                isItemProccesed = true;
            } else {
                unprocessedProducts.push({ product: cartItem.product.id, quantity: cartItem.quantity });
            }
        });
        
        if(unprocessedProducts.length == 0){
            await factory.cart.deleteProducts(cid);
        } else await factory.cart.updateCart(cid, { products: unprocessedProducts });

        if(isItemProccesed) {
            const ticket = await factory.ticket.createTicket({ "amount": amount, "purchaser": req.user.email});
            res.render(Constants.CART, { success: Constants.PURCHASE_SUCCESS, purchase: true, ticket, unprocessedProducts });
        } else res.render(Constants.CART, { warning: Constants.NO_PRODUCTS_PROCESSED, purchase: true, unprocessedProducts });
        
    } catch (error) {
        logError(error, req);
        res.render(Constants.CART, { error: error.message });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if(email && password ){
            let user = await JWTService.login(email, password);
            if (user) {
                if(!user.cart) {
                    const newCart = await factory.cart.createCart({});
                    user = await factory.user.updateUser(user.email, { cart: newCart.id });
                }
                const token = generateToken(new UserDTO(user));
                req.session.authToken = token;
                res.redirect(Constants.PRODUCTS);
            } else {
                logger.warning(ERRORS.LOGIN_INVALID_PASS, null, email);
                res.render(Constants.LOGIN, { error: ERRORS.LOGIN_INVALID_PASS.message });
            }
        } else res.render(Constants.LOGIN);
    } catch (error) {
        logError(error, req);
        res.render(Constants.LOGIN, { error: error.message });
    }
}

export async function logout(req, res) {
    try {
        delete req.headers['authorization'];
        delete req.session.authToken;
        res.render(Constants.LOGIN, { success: Constants.LOGOUT_SUCCESS });
    } catch (error) {
        logError(error, req);
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
    const { token } = req.query;
    let fromEmail = false;
    let isValid = false;
    try{
        if(token) {
            try {
                isValid = jwt.verify(token, config.secret);
            } catch (error){
                throw CustomError.createError(ERRORS.INVALID_EXPIRED_LINK_TOKEN);
            }
            fromEmail= true;
            res.render(Constants.PASSWORD_RECOVERY, { fromEmail, user: isValid.user });
        } else res.render(Constants.PASSWORD_RECOVERY, { fromEmail });
    } catch (error) {
        logWarning(error, req);
        res.render(Constants.PASSWORD_RECOVERY, { error: error.message });
    }
}

export async function passwordRecoveryEmail(req, res){
    const { email } = req.body;
    try {
        const user = await factory.user.getUser(email);
        if(!user) throw CustomError.createError(ERRORS.USER_NOT_FOUND, null, email);
        const token = generateToken(user);
        EmailSender.sendPassRecoveryEmail(user, token);
        res.render(Constants.PASSWORD_RECOVERY, { emailSent: true, user });
    } catch (error) {
        logError(error, req);
        res.render(Constants.PASSWORD_RECOVERY, { error: error.message });
    }
}

export async function updatePassword(req, res){
    const { email } = req.params;
    const { newPassword } = req.body;
    try {
        await factory.user.updateUser(email, { password: newPassword }, true);
        res.render(Constants.LOGIN, { success: Constants.PASSWORD_UPDATE_SUCCESS });
      } catch (error) {
        res.render(Constants.PASSWORD_RECOVERY, { fromEmail: true, user: { email }, error: error.message });
      }
}

export async function createUser(req, res) {
    try {
        const data = req.body;
        const user = await factory.user.createUser(data);
        const token = generateToken(new UserDTO(user));
        req.session.authToken = token;
        res.redirect(Constants.PRODUCTS);
    } catch (error) {
        logError(error, req);
        res.render(Constants.REGISTRATION, { error: error.message });
    }
}

function logWarning(error, req){
    logger.warning(`Message: ${error.message} - Message Code: ${error.code} - Path: ${req.path} - Status Code: ${error.status} - User: ${error.user}`);
}
function logError(error, req){
    logger.error(`Error: ${JSON.stringify(ERRORS.UNHANDLED_ERROR)} - Message: ${error.message} - Path: ${req.path} - User: ${error.user}`);
}