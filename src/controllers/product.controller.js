import * as ProductService from '../services/product.service.js'
import { STATUS } from './../constants/constants.js';

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

        const response = await ProductService.getProducts(query, options);
        if (response.docs.length == 0){
            res.status(404).json({
                message: "Products were not found.",
                status: STATUS.FAILED
            });
        } else {
            res.json({
                products: response,
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

export async function getProduct(req, res){
    try {
        const { pid } = req.params;
        const response = await ProductService.getProduct(pid);
        if (response.length == 0){
            res.status(404).json({
                message: "Product was not found.",
                status: STATUS.FAILED
            });
        }
        res.json({
            product: response,
            status: STATUS.SUCCESS
        })
    } catch (error) {
        res.status(400).json({
            error: error.message,
            status: STATUS.FAILED
        });
    }
}

export async function addProduct(req, res){
    try {
        const { body } = req;
        const response = await ProductService.addProduct(body);
        res.status(201).json({
            product: response,
            status: STATUS.SUCCESS
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
            status: STATUS.FAILED
        });
    }
}

export async function updateProduct(req, res){
    try {
        const { pid } = req.params;
        const { body } = req;
        const response = await ProductService.updateProduct(pid, body);
        if (!response){
            res.status(404).json({
                product: "Product to update was not found",
                status: STATUS.FAILED
            });
        } else {
            res.json({
                product: response,
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

export async function deleteProduct(req, res){
    try {
        const { pid } = req.params;
        const response = await ProductService.deleteProduct(pid);
        if (response.matchedCount == 0){
            res.status(404).json({
                product: "Product to delete was not found",
                status: STATUS.FAILED
            });
        } else {
            res.json({
                message: "Product has been successfully deleted.",
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