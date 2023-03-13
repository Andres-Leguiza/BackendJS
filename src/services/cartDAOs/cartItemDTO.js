import ProductDTO from "../productDAOs/productDTO.js";

export default class CartItemDTO {
    constructor(cartItem){
        this.product = cartItem.product.title ? new ProductDTO(cartItem.product) : cartItem.product;
        this.quantity = cartItem.quantity
    }
}