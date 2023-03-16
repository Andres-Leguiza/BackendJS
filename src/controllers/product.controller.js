import factory from '../services/factory.js';
import * as Constants from './../constants/constants.js';

export async function getProducts(req, res){
    try {
        let options = {
            limit: req.query.limit ? req.query.limit : 10,
            page: req.query.page ? req.query.page : 1,
            sort: req.query.sort && { price: req.query.sort }
        }

        let query = {};
        if(req.query.category){
            query = {
                category: req.query.category
            }
        }
        if(req.query.status){
            query = {
                ...query,
                status: req.query.status
            }
        };

        const products = await factory.product.getProducts(query, options);
        if (!products || products.length == 0){
            res.status(404).json({
                message: Constants.PRODUCTS_NOT_FOUND,
                status: Constants.STATUS.FAILED
            });
        } else {
            res.json({
                products,
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

export async function getProduct(req, res){
    try {
        const { pid } = req.params;
        const product = await factory.product.getProduct(pid);
        if (!product){
            res.status(404).json({
                message: Constants.PRODUCT_NOT_FOUND,
                status: Constants.STATUS.FAILED
            });
        } else {
            res.json({
                product,
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

export async function addProduct(req, res){
    try {
        const { body } = req;
        const product = await factory.product.addProduct(body);
        res.status(201).json({
            product,
            status: Constants.STATUS.SUCCESS
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            status: Constants.STATUS.FAILED
        });
    }
}

export async function updateProduct(req, res){
    try {
        const { pid } = req.params;
        const { body } = req;
        const product = await factory.product.updateProduct(pid, body);
        if (!product){
            res.status(404).json({
                message: Constants.PRODUCT_NOT_FOUND,
                status: Constants.STATUS.FAILED
            });
        } else {
            res.json({
                product,
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

export async function deleteProduct(req, res){
    try {
        const { pid } = req.params;
        const product = await factory.product.getProduct(pid);
        if (!product || product.deleted){
            res.status(404).json({
                message: Constants.PRODUCT_NOT_FOUND_OR_DELETED,
                status: Constants.STATUS.FAILED
            });
        } else {
            await factory.product.deleteProduct(pid);
            res.json({
                message: Constants.PRODUCT_DELETE_SUCCESS,
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