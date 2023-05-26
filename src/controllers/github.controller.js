import * as Constants from '../constants/constants.js';
import { ERRORS } from '../constants/errors.js';
import factory from '../services/factory.js';
import UserDTO from '../services/userDAOs/userDTO.js';
import { generateToken } from '../utils/jwt.util.js';

export async function renderFailure(req, res){
    try {
        res.render(Constants.LOGIN, { error: ERRORS.GITHUB_ERROR_MESSAGE.message });
    } catch (error) {
        res.render(Constants.LOGIN, { error: error.message });
    }
}

export async function handleCallback(req, res){
    try {
        let user = req.user;
        if(!user?.cart) {
            const newCart = await factory.cart.createCart({});
            user = await factory.user.updateUser(user.email, { cart: newCart.id });
        }
        req.session.authToken = generateToken(new UserDTO(user));
        res.redirect(Constants.PRODUCTS_VIEW);
    } catch (error) {
        res.render(Constants.LOGIN, { error: error.message });
    }
}