import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { STATUS, UNAUTHORIZED_USER } from '../constants/constants.js';

export function apiAuth(req, res, next) {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        res.status(403).json({
        message: UNAUTHORIZED_USER,
        status: STATUS.FAILED
      });
    } else {
      const token = authHeader.split(" ")[1];
      const isValid = jwt.verify(token, config.secret);
      if (isValid) {
        req.user = isValid.user;
        return next()
      }
    }
  } catch (error) {
      throw new Error(error.message);
  }
}

export function auth(req, res, next) {
  if (req.session.authenticated) {
    req.session.touch();
    next();
  } else {
    res.redirect(Constants.LOGIN_VIEW);
  }
}