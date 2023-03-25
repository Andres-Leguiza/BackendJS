import { Router } from "express";
import { getCurrentUser } from '../controllers/session.controller.js';
import passport from '../utils/passport.util.js';
import { ERRORS } from "../constants/errors.js";
import CustomError from "../utils/customError.js";

const sessionRouter = new Router();

sessionRouter.get("/unauthenticated", () => { throw CustomError.createError(ERRORS.MISSING_INVALID_TOKEN) });
sessionRouter.get('/current', passport.authenticate('current', { session: false, failureRedirect: '/api/sessions/unauthenticated' }), getCurrentUser);

export default sessionRouter;