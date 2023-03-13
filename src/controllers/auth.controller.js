import * as AuthService from "../services/userDAOs/auth.service.js";
import * as Constants from './../constants/constants.js';

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const authenticated = await AuthService.login(email, password);
    if (authenticated) {
      req.session.authenticated = true;
      res.json({
        message: Constants.LOGIN_SUCCESS,
        status: Constants.STATUS.SUCCESS
      });
    } else {
      res.status(400).json({
        error: Constants.LOGIN_INVALID_USER_PASS_ERROR,
        status: Constants.STATUS.FAILED
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: Constants.STATUS.FAILED
    });
  }
}

export async function logout(req, res) {
  try {
    req.session.destroy((error) => {
      if (error) {
        res.status(400).json({
          error: error.message,
          status: Constants.STATUS.FAILED
        });
      } else {
        res.json({
          message: Constants.LOGOUT_SUCCESS,
          status: Constants.STATUS.SUCCESS
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: Constants.STATUS.FAILED
    });
  }
}