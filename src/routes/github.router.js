import { Router } from 'express';
import passport from '../utils/passport.util.js';
import * as Constants from "../constants/constants.js";
import * as GithubController from '../controllers/github.controller.js';

const githubRouter = Router();

githubRouter.get('/login', passport.authenticate("github", { scope:["user:email"] }));
githubRouter.get('/callback', passport.authenticate('github', { failureRedirect: Constants.GITHUB_LOGIN_FAIL_VIEW }), GithubController.handleCallback);

export default githubRouter;