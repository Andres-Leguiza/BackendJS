import { STATUS } from './../constants/constants.js';

export function apiAuth(req, res, next) {
  if (req.session.authenticated) {
    req.session.touch();
    next();
  } else {
    res.status(401).json({
      error: "User is not authenticated.",
      status: STATUS.FAILED
    });
  }
}

export function auth(req, res, next) {
  if (req.session.authenticated) {
    req.session.touch();
    next();
  } else {
    res.redirect("login");
  }
}