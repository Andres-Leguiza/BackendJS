import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { HOME } from '../constants/constants.js';
import { ERRORS } from '../constants/errors.js';
import CustomError from '../utils/customError.js';

export function apiAuth(req, res, next) {
  const authHeader = req.get('Authorization');
  try {
    if (!authHeader) {
      throw CustomError.createError(ERRORS.MISSING_INVALID_TOKEN);
    } else {
      const token = authHeader.split(" ")[1];
      let isValid = false;
      try {
        isValid = jwt.verify(token, config.secret);
      } catch (error) {
        throw CustomError.createError(ERRORS.MISSING_INVALID_TOKEN);
      }
      if (isValid) {
        req.user = isValid.user;
        return next()
      }
    }
  } catch (error) {
    if(!error.code) next(CustomError.createError(ERRORS.UNHANDLED_ERROR, error.message)); else next(error);
  }
}

export function auth(req, res, next) {
  const token = req.session.authToken || "";
  try {
    const isValid = jwt.verify(token, config.secret);
    if (!isValid) {
      res.render(HOME, { error: ERRORS.MISSING_INVALID_TOKEN.message });
    } else {
        req.user = isValid.user;
        return next();
      }
  } catch (error) {
    res.render(HOME, { error: ERRORS.MISSING_INVALID_TOKEN.message });
  }
}