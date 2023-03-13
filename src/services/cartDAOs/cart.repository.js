import CartDTO from './cartDTO.js';
import CartListDTO from './cartListDTO.js';

export class CartRepository {
    constructor(dao){
        this.dao = dao;
    }

    async getCarts(){
        const carts = await this.dao.getCarts();
        const cartsDTO = carts ? new CartListDTO(carts) : null;
        return cartsDTO;
    }

    async getCart(cartId){
        const cart = await this.dao.getCart(cartId);
        const cartDTO = cart ? new CartDTO(cart) : null;
        return cartDTO; 
    }

    async createCart(data){
        const cart = await this.dao.createCart(data);
        const cartDTO = new CartDTO(cart);
        return cartDTO;
    }

    async addProductToCart(cartId, productId){
        const cart = await this.dao.addProductToCart(cartId, productId);
        const cartDTO = cart ? new CartDTO(cart) : null;
        return cartDTO; 
    }

    async updateProductQty(cartId, productId, quantity){
        const cart = await this.dao.updateProductQty(cartId, productId, quantity);
        const cartDTO = cart ? new CartDTO(cart) : null;
        return cartDTO; 
    }

    async updateCart(cartId, data){
        const cart = await this.dao.updateCart(cartId, data);
        const cartDTO = cart ? new CartDTO(cart) : null;
        return cartDTO; 
    }

    async deleteProduct(cartId, productId){
        const cart = await this.dao.deleteProduct(cartId, productId);
        const cartDTO = cart ? new CartDTO(cart) : null;
        return cartDTO; 
    }

    async deleteProducts(cartId){
        const cart = await this.dao.deleteProducts(cartId);
        const cartDTO = cart ? new CartDTO(cart) : null;
        return cartDTO;
    }
}