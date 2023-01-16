import * as ProductService from '../services/product.service.js'
import { STATUS } from './../constants/constants.js';

export async function getProducts(req, res){
    try {
        const response = await ProductService.getProducts();
        if (response.length == 0){
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

export async function getRealtimeProducts(req, res){
    try {
        const response = await ProductService.getProducts();
        let productsList = response.map(product => {
            return {
                id: product._id,
                title: product.title,
                description: product.description,
                price: product.price,
                status: product.status,
                thumbnails: product.thumbnails,
                code: product.code,
                stock: product.stock
            }
        });
        res.render('realTimeProducts', { products: productsList });
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
        const productList = await ProductService.getProducts();
        req.io.emit('updateProducts', productList);
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
        const { productId } = req.params;
        const { body } = req;
        const response = await ProductService.updateProduct(productId, body);
        if (!response){
            res.status(404).json({
                product: "Product to update was not found",
                status: STATUS.FAILED
            });
        } else {
            const productList = await ProductService.getProducts();
            req.io.emit('updateProducts', productList);
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
            const productList = await ProductService.getProducts();
            req.io.emit('updateProducts', productList);
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