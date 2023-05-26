import { ERRORS } from '../constants/errors.js';
import factory from '../services/factory.js';
import CustomError from '../utils/customError.js';
import EmailSender from '../utils/emailSender.js';
import { STATUS, ADMIN, PREMIUM } from './../constants/constants.js';

export async function getProducts(req, res, next){
    try {
        let options = {
            limit: req.query.limit || 10,
            page: req.query.page || 1,
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
            throw CustomError.createError(ERRORS.PRODUCTS_NOT_FOUND, null, req.user?.email);
        } else {
            res.json({
                products: products.productList,
                status: STATUS.SUCCESS
            });
        }
    } catch (error) {
        handleErrors(error, req, next);
    }
}

export async function getProduct(req, res, next){
    try {
        const { pid } = req.params;
        const product = await factory.product.getProduct(pid);
        if (!product){
            throw CustomError.createError(ERRORS.PRODUCT_NOT_FOUND, null, req.user?.email);
        } else {
            res.json({
                product,
                status: STATUS.SUCCESS
            });
        }
    } catch (error) {
        handleErrors(error, req, next);
    }
}

export async function addProduct(req, res, next){
    try {
        const { body } = req;
        try {
            const product = await factory.product.addProduct(body);
            res.status(201).json({
                product,
                status: STATUS.SUCCESS
            });
        } catch (error) { throw CustomError.createError(ERRORS.INVALID_INPUT_PRODUCT, null, req.user?.email) }
    } catch (error) {
        handleErrors(error, req, next);
    }
}

export async function updateProduct(req, res, next){
    try {
        const { pid } = req.params;
        const { body } = req;
        const product = await factory.product.updateProduct(pid, body);
        if (!product){
            throw CustomError.createError(ERRORS.PRODUCT_NOT_FOUND, null, req.user?.email);
        } else {
            res.json({
                product,
                status: STATUS.SUCCESS
            });
        }
    } catch (error) {
        handleErrors(error, req, next);
    }
}

export async function deleteProduct(req, res, next){
    try {
        const { pid } = req.params;
        const product = await factory.product.getProduct(pid);
        if (!product || product.deleted) throw CustomError.createError(ERRORS.PRODUCT_NOT_FOUND_OR_DELETED, null, req.user?.email);
        if (req.user.role === PREMIUM && product.owner !== req.user?.id) throw CustomError.createError(ERRORS.UNAUTHORIZED_DELETE, null, req.user?.email);
        await factory.product.deleteProduct(pid);

        let user = req.user;
        if (req.user.role === ADMIN) user = await factory.user.getUserById(product.owner);
        EmailSender.sendProductDeletionEmail(user);
        res.status(204).send();
    } catch (error) {
        handleErrors(error, req, next);
    }
}

function handleErrors(error, req, next){
    if(!error.code) next(CustomError.createError(ERRORS.UNHANDLED_ERROR, error.message, req.user?.email)); else next(error);
}