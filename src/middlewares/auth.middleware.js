import * as Constants from './../constants/constants.js';

export function apiAuth(req, res, next) {
  if (req.session.authenticated) {
    req.session.touch();
    next();
  } else {
    res.status(401).json({
      message: Constants.UNAUTHENTICATED,
      status: Constants.STATUS.FAILED
    });
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