import { Router } from 'express';
import passport from '../utils/passport.util.js';
import * as Constants from "../constants/constants.js";
import { handleCallback } from '../controllers/github.controller.js';

const githubRouter = Router();

githubRouter.get('/login', passport.authenticate("github", { scope:["user:email"] }));
githubRouter.get('/callback', passport.authenticate('github', { failureRedirect: Constants.GITHUB_LOGIN_FAIL_VIEW }), handleCallback);

export default githubRouter;