import { ProductModel } from './../models/product.model.js';

export async function getProducts(query, options){
    try {
        const products = await ProductModel.paginate(query, options);
        return products;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getProduct(productId){
    try {
        const product = await ProductModel.findById(productId);
        return product;
    } catch (error) {
       throw new Error(error.message);
    }
}

export async function addProduct(data){
    try {
        const product = await ProductModel.create(data);
        return product;
    } catch (error) {
       throw new Error(error.message);
    }
}

export async function updateProduct(productId, data){
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, data, { new: true });
        return updatedProduct;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function deleteProduct(productId){
    try {
        const deletedProduct = await ProductModel.delete({ _id: productId });
        return deletedProduct;
    } catch (error) {
        throw new Error(error.message);
    }
}