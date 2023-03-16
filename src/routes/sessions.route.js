import { Router } from "express";
import { getCurrentUser } from '../controllers/session.controller.js';
import passport from '../utils/passport.util.js';
import { STATUS, MISSING_INVALID_TOKEN } from '../constants/constants.js';

const sessionRouter = new Router();

sessionRouter.get("/unauthenticated", (req, res) => {
    res.status(401).json({
        message: MISSING_INVALID_TOKEN,
        status: STATUS.FAILED
    });
});

sessionRouter.get('/current', passport.authenticate('current', { session: false, failureRedirect: '/api/sessions/unauthenticated' }), getCurrentUser);

export default sessionRouter;