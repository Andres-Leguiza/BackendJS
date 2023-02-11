import * as CartService from '../services/cart.service.js'
import * as Constants from '../constants/constants.js';

export async function getCarts(req, res){
    try {
        const carts = await CartService.getCarts();
        if (carts.length == 0){
            res.status(404).json({
                message: Constants.CARTS_NOT_FOUND,
                status: Constants.STATUS.FAILED
            });
        } else {
            res.json({
                carts,
                status: Constants.STATUS.SUCCESS
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message,
            status: Constants.STATUS.FAILED
        });
    }
}

export async function getCart(req, res){
    try {
        const { cid } = req.params;
        const cart = await CartService.getCart(cid);
        if (!cart){
            res.status(404).json({
                message: Constants.CART_NOT_FOUND,
                status: Constants.STATUS.FAILED
            });
        }
        res.json({
            cart,
            status: Constants.STATUS.SUCCESS
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
            status: Constants.STATUS.FAILED
        });
    }
}

export async function createCart(req, res){
    try {
        const { body } = req;
        const cart = await CartService.createCart(body);
        res.status(201).json({
            cart,
            status: Constants.STATUS.SUCCESS
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
            status: Constants.STATUS.FAILED
        });
    }
}

export async function addProductToCart(req, res){
    try {
        const { cid, pid } = req.params;
        const cart = await CartService.addProductToCart(cid, pid);
        if (!cart){
            res.status(404).json({
                message: Constants.CART_NOT_FOUND,
                status: Constants.STATUS.FAILED
            });
        } else {
            res.json({
                cart,
                status: Constants.STATUS.SUCCESS
            });
        }
    } catch (error) {
        res.status(400).json({
            error: error.message,
            status: Constants.STATUS.FAILED
        });
    }
}

export async function updateProductQty(req, res){
    try {
        const { cid, pid } = req.params;
        const { body } = req;
        const cart = await CartService.updateProductQty(cid, pid, body.quantity);
        if (!cart){
            res.status(404).json({
                message: Constants.CART_NOT_FOUND,
                status: Constants.STATUS.FAILED
            });
        } else {
            res.json({
                cart,
                status: Constants.STATUS.SUCCESS
            });
        }
    } catch (error) {
        res.status(400).json({
            error: error.message,
            status: Constants.STATUS.FAILED
        });
    }
}

export async function updateCart(req, res){
    try {
        const { cid } = req.params;
        const { body } = req;
        const cart = await CartService.updateCart(cid, body);
        if (!cart){
            res.status(404).json({
                message: Constants.CART_NOT_FOUND,
                status: Constants.STATUS.FAILED
            });
        } else {
            res.json({
                cart,
                status: Constants.STATUS.SUCCESS
            });
        }
    } catch (error) {
        res.status(400).json({
            error: error.message,
            status: Constants.STATUS.FAILED
        });
    }
}

export async function deleteProduct(req, res){
    try {
        const { cid, pid } = req.params;
        const cart = await CartService.deleteProduct(cid, pid);
        if (!cart){
            res.status(404).json({
                message: Constants.CART_NOT_FOUND,
                status: Constants.STATUS.FAILED
            });
        } else {
            res.json({
                cart,
                status: Constants.STATUS.SUCCESS
            });
        }
    } catch (error) {
        res.status(400).json({
            error: error.message,
            status: Constants.STATUS.FAILED
        });
    }
}

export async function deleteProducts(req, res){
    try {
        const { cid } = req.params;
        const cart = await CartService.deleteProducts(cid);
        if (!cart){
            res.status(404).json({
                message: Constants.CART_NOT_FOUND,
                status: Constants.STATUS.FAILED
            });
        } else {
            res.json({
                cart,
                status: Constants.STATUS.SUCCESS
            });
        }
    } catch (error) {
        res.status(400).json({
            error: error.message,
            status: Constants.STATUS.FAILED
        });
    }
}