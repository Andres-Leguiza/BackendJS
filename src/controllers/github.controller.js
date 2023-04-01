import * as Constants from '../constants/constants.js';
import { ERRORS } from '../constants/errors.js';

export async function renderFailure(req, res){
    try {
        res.render(Constants.LOGIN, { error: ERRORS.GITHUB_ERROR_MESSAGE.message });
    } catch (error) {
        res.render(Constants.LOGIN, { error: error.message });
    }
}

export async function handleCallback(req, res){
    try {
        req.session.userEmail = req.user.email;
        req.session.authenticated = true;
        res.redirect(Constants.PRODUCTS_VIEW);
    } catch (error) {
        res.render(Constants.LOGIN, { error: error.message });
    }
}