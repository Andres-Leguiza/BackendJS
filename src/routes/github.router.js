import { Router } from 'express';
import passport from '../utils/passport.util.js';
import * as Constants from "../constants/constants.js"

const githubRouter = Router();

githubRouter.get('/fail', (req, res) => {
    res.render(Constants.LOGIN, { error: Constants.GITHUB_ERROR_MESSAGE });
});

githubRouter.get('/login', passport.authenticate("github", { scope:["user:email"] }));
githubRouter.get('/callback', passport.authenticate('github', { failureRedirect: Constants.GITHUB_LOGIN_FAIL_URI }), async(req, res) => {
    req.session.userEmail = req.user.email;
    req.session.authenticated = true;
    res.redirect(Constants.PRODUCTS_VIEW);
});

export default githubRouter;