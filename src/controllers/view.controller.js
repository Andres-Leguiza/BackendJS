import * as ProductService from '../services/productDAOs/product.service.js';
import * as JWTService from '../services/auth/jwt.service.js';
import * as UserService from "../services/userDAOs/user.service.js";
import * as CartService from '../services/cartDAOs/cart.service.js';
import factory from '../services/factory.js';
import jwt from 'jsonwebtoken';
import { generateToken } from './../utils/jwt.util.js';
import * as Constants from "../constants/constants.js";
import logger from '../utils/logger.js';
import { ERRORS } from '../constants/errors.js';
import CustomError from '../utils/customError.js';
import EmailSender from './../utils/emailSender.js';
import UserDTO from '../services/userDAOs/userDTO.js';

export async function renderHome(req, res){
    try {
        const page = req.query.page ? req.query.page : 1;
        const products = await ProductService.getProducts({},{limit: 10, page: page, lean: true});
        const user = req.user;
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
        const user = await JWTService.login(email, password);
        if (user) {
            const token = generateToken(new UserDTO(user));
            req.session.authToken = token;
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
        delete req.headers['authorization'];
        delete req.session.authToken;
        res.render(Constants.LOGIN, { success: Constants.LOGOUT_SUCCESS });
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
        }
        res.render(Constants.PASSWORD_RECOVERY, { fromEmail });
    } catch (error) {
        res.render(Constants.PASSWORD_RECOVERY, { error: error.message });
        logWarning(error, req);
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
      const user = await UserService.createUser(data);
      req.session.authenticated = true;
      req.session.userEmail = user.email;
      res.redirect(Constants.PRODUCTS);
    } catch (error) {
      res.render(Constants.REGISTRATION, { error: error.message });
    }
}

function logWarning(error, req){
    logger.warning(`Message: ${error.message} - Message Code: ${error.code} - Path: ${req.path} - Status Code: ${error.status} - User: ${error.user}`);
}