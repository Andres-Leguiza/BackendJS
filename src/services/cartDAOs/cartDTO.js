
import CartItemDTO from './cartItemDTO.js';

export default class CartDTO {
    constructor(cart){
        this.id = cart._id || cart.id;
        this.products = cart.products.map(cartItem => new CartItemDTO(cartItem));
        this.deleted = cart.deleted;
        this.createdAt = cart.createdAt;
        this.updatedAt = cart.updatedAt;
    }
}