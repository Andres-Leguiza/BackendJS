export function auth(req, res, next) {
    if (req.session.authenticated) {
      req.session.touch();
      next();
    } else {
      res.status(400).send("User is not authenticated.");
    }
  }