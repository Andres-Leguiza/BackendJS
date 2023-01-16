
import * as CartService from '../services/cart.service.js'
import { STATUS } from '../constants/constants.js';

export async function getCarts(req, res){
    try {
        const response = await CartService.getCarts();
        if (response.length == 0){
            res.status(404).json({
                message: "Carts were not found.",
                status: STATUS.FAILED
            });
        } else {
            res.json({
                carts: response,
                status: STATUS.SUCCESS
            });
        }
        
    } catch (error) {
        res.status(500).json({
            error: error.message,
            status: STATUS.FAILED
        });
    }
}

export async function getCart(req, res){
    try {
        const { cid } = req.params;
        const response = await CartService.getCart(cid);
        if (response.length == 0){
            res.status(404).json({
                message: "Cart was not found.",
                status: STATUS.FAILED
            });
        }
        res.json({
            cart: response,
            status: STATUS.SUCCESS
        })
    } catch (error) {
        res.status(400).json({
            error: error.message,
            status: STATUS.FAILED
        });
    }
}

export async function createCart(req, res){
    try {
        const { body } = req;
        const response = await CartService.createCart(body);
        res.status(201).json({
            cart: response,
            status: STATUS.SUCCESS
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
            status: STATUS.FAILED
        });
    }
}

export async function addProductToCart(req, res){
    try {
        const { cid, pid } = req.params;
        const response = await CartService.addProductToCart(cid, pid);
        if (!response){
            res.status(404).json({
                message: "Cart was not found.",
                status: STATUS.FAILED
            });
        } else {
            res.json({
                cart: response,
                status: STATUS.SUCCESS
            });
        }
    } catch (error) {
        res.status(400).json({
            error: error.message,
            status: STATUS.FAILED
        });
    }
}