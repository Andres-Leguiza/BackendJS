import ProductDTO from './productDTO.js';
import ProductListDTO from './productListDTO.js';

export class ProductRepository {
    constructor(dao){
        this.dao = dao;
    }

    async getProducts(query, options){
        const products = await this.dao.getProducts(query, options);
        const productsDTO = products ? new ProductListDTO(products) : null;
        return productsDTO;
    }

    async getProduct(productId){
        const product = await this.dao.getProduct(productId);
        const productDTO = product ? new ProductDTO(product._doc) : null;
        return productDTO; 
    }

    async addProduct(data){
        const product = await this.dao.addProduct(data);
        const productDTO = new ProductDTO(product._doc);
        return productDTO; 
    }

    async updateProduct(productId, data){
        const updatedProduct = await this.dao.updateProduct(productId, data);
        const productDTO = updatedProduct ? new ProductDTO(updatedProduct._doc) : null;
        return productDTO; 
    }

    async deleteProduct(productId){
        const deletedProduct = await this.dao.deleteProduct(productId);
        const productDTO = deletedProduct ? new ProductDTO(deletedProduct._doc) : null;
        return productDTO; 
    }
}