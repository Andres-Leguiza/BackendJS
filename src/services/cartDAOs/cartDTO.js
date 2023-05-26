import CartItemDTO from './cartItemDTO.js';
import moment from 'moment';

export default class CartDTO {
    constructor(cart){
        this.id = cart._id || cart.id;
        this.products = cart.products.map(cartItem => new CartItemDTO(cartItem));
        this.deleted = cart.deleted;
        this.createdAt = moment(cart.createdAt).format('MM/DD/YYYY');
        this.updatedAt = moment(cart.updatedAt).format('MM/DD/YYYY');
    }
}