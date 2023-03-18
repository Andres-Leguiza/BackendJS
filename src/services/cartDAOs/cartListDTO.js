import CartDTO from './cartDTO.js';

export default class CartListDTO {
    constructor(cartList){
        this.cartList = cartList.map(cart => new CartDTO(cart._doc));
    }
}