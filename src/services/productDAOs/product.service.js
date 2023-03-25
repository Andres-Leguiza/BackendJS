import { ProductModel } from '../../models/product.model.js';

export async function getProducts(query, options){
    const products = await ProductModel.paginate({...query, deletedAt: { $exists: false }}, options);
    return products;
}

export async function getProduct(productId){
    const product = await ProductModel.findById(productId);
    return product;
}

export async function addProduct(data){
    const product = await ProductModel.create(data);
    return product;
}

export async function updateProduct(productId, data){
    const updatedProduct = await ProductModel.findByIdAndUpdate(productId, data, { new: true });
    return updatedProduct;
}

export async function deleteProduct(productId){
    const deletedProduct = await ProductModel.delete({ _id: productId });
    return deletedProduct;
}