import { CartModel } from '../../models/cart.model.js';

export async function getCarts(){
    const carts = await CartModel.find({ deletedAt: { $exists: false } });
    return carts;
}

export async function getCart(cartId){
    const cart = await CartModel.findById({ _id: cartId }).populate("products.product").lean();
    return cart;
}

export async function createCart(data){
    const cart = await CartModel.create(data);
    return cart;
}

export async function addProductToCart(cartId, productId){
    const cart = await CartModel.findById(cartId);
    if (cart) {
        const productToUpdate = cart.products.find(product => product.product == productId);
        if (productToUpdate){
            productToUpdate.quantity = productToUpdate.quantity + 1;
        } else {
            cart._doc.products.push({ product: productId, quantity: 1 });
        }
        await CartModel.findByIdAndUpdate(cartId, cart, { new: true });
    }
    return cart;
}

export async function updateProductQty(cartId, productId, quantity){
    const cart = await CartModel.findById(cartId);
    if (cart) {
        const productToUpdate = cart.products.find(product => product.product == productId);
        if (productToUpdate){
            productToUpdate.quantity = quantity;
        } else {
            cart._doc.products.push({ product: productId, quantity: quantity });
        }
        await CartModel.findByIdAndUpdate(cartId, cart, { new: true });
    }
    return cart;
}

export async function updateCart(cartId, data){
    const cart = await CartModel.findById(cartId);
    if(cart){
        cart._doc.products = data.products;
        await CartModel.findByIdAndUpdate(cartId, cart, { new: true });
    }
    return cart;
}

export async function deleteProduct(cartId, productId){
    const cart = await CartModel.findById(cartId);
    if (cart) {
        cart._doc.products = await cart._doc.products.filter(cartItem => cartItem.product.toString() !== productId.toString());
        await CartModel.findByIdAndUpdate(cartId, cart, { new: true });
    }
    return cart;
}

export async function deleteProducts(cartId){
    const cart = await CartModel.findById(cartId);
    if (cart) {
        cart._doc.products = [];
        await CartModel.findByIdAndUpdate(cartId, cart, { new: true });
    }
    return cart;
}