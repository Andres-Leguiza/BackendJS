import * as Constants from '../constants/constants.js';
import { ERRORS } from '../constants/errors.js';
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
        req.session.authToken = generateToken(new UserDTO(req.user));
        res.redirect(Constants.PRODUCTS_VIEW);
    } catch (error) {
        res.render(Constants.LOGIN, { error: error.message });
    }
}