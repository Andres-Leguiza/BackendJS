import factory from '../services/factory.js';
import { STATUS } from '../constants/constants.js';
import CustomError from '../utils/customError.js';
import { ERRORS } from '../constants/errors.js';

export async function getCarts(req, res, next){
    try {
        const carts = await factory.cart.getCarts();
        if (!carts || carts.length == 0){
            throw CustomError.createError(ERRORS.CARTS_NOT_FOUND, null, req.user?.email);
        } else {
            res.json({
                carts,
                status: STATUS.SUCCESS
            });
        }
    } catch (error) {
        handleErrors(error, req, next);
    }
}

export async function getCart(req, res, next){
    try {
        const { cid } = req.params;
        const cart = await factory.cart.getCart(cid);
        if (!cart){
            throw CustomError.createError(ERRORS.CART_NOT_FOUND, null, req.user?.email);
        } else {
            res.json({
                cart,
                status: STATUS.SUCCESS
            });
        }
    } catch (error) {
        handleErrors(error, req, next);
    }
}

export async function createCart(req, res, next){
    try {
        const { body } = req;
        const cart = await factory.cart.createCart(body);
        res.status(201).json({
            cart,
            status: STATUS.SUCCESS
        });
    } catch (error) {
        next(CustomError.createError(ERRORS.UNHANDLED_ERROR, error.message, req.user?.email));
    }
}

export async function addProductToCart(req, res, next){
    try {
        const { cid, pid } = req.params;
        const cart = await factory.cart.addProductToCart(cid, pid);
        if (!cart){
            throw CustomError.createError(ERRORS.CART_NOT_FOUND, null, req.user?.email);
        } else {
            res.json({
                cart,
                status: STATUS.SUCCESS
            });
        }
    } catch (error) {
        handleErrors(error, req, next);
    }
}

export async function updateProductQty(req, res, next){
    try {
        const { cid, pid } = req.params;
        const { body } = req;
        const cart = await factory.cart.updateProductQty(cid, pid, body.quantity);
        if (!cart){
            throw CustomError.createError(ERRORS.CART_NOT_FOUND, null, req.user?.email);
        } else {
            res.json({
                cart,
                status: STATUS.SUCCESS
            });
        }
    } catch (error) {
        handleErrors(error, req, next);
    }
}

export async function updateCart(req, res, next){
    try {
        const { cid } = req.params;
        const { body } = req;
        const cart = await factory.cart.updateCart(cid, body);
        if (!cart){
            throw CustomError.createError(ERRORS.CART_NOT_FOUND, null, req.user?.email);
        } else {
            res.json({
                cart,
                status: STATUS.SUCCESS
            });
        }
    } catch (error) {
        handleErrors(error, req, next);
    }
}

export async function deleteProduct(req, res, next){
    try {
        const { cid, pid } = req.params;
        const cart = await factory.cart.deleteProduct(cid, pid);
        if (!cart){
            throw CustomError.createError(ERRORS.CART_NOT_FOUND, null, req.user?.email);
        } else {
            res.json({
                cart,
                status: STATUS.SUCCESS
            });
        }
    } catch (error) {
        handleErrors(error, req, next);
    }
}

export async function deleteProducts(req, res, next){
    try {
        const { cid } = req.params;
        const cart = await factory.cart.deleteProducts(cid);
        if (!cart){
            throw CustomError.createError(ERRORS.CART_NOT_FOUND, null, req.user?.email);
        } else {
            res.status(204).send();
        }
    } catch (error) {
        handleErrors(error, req, next);
    }
}

export async function purchase(req, res, next){
    try {
        const { cid } = req.params;
        const cart = await factory.cart.getCart(cid);
        if (!cart){
            throw CustomError.createError(ERRORS.CART_NOT_FOUND, null, req.user?.email);
        } else {
            let amount = 0;
            let unprocessedProducts = [];
            cart.products.forEach( cartItem => {
                if(cartItem.quantity <= cartItem.product.stock){
                    factory.product.updateProduct(cartItem.product.id, {"stock": cartItem.product.stock - cartItem.quantity});
                    amount += cartItem.product.price;
                    factory.cart.deleteProduct(cid, cartItem.product.id);
                } else {
                    unprocessedProducts.push(cartItem.product.id);
                }
            });
            const ticket = await factory.ticket.createTicket({ "amount": amount, "purchaser": req.user.email});
            res.json({
                ticket,
                unprocessedProducts,
                status: STATUS.SUCCESS
            });
        }
    } catch (error) {
        handleErrors(error, req, next);
    }
}

function handleErrors(error, req, next){
    if(!error.code) next(CustomError.createError(ERRORS.UNHANDLED_ERROR, error.message, req.user?.email)); else next(error);
};