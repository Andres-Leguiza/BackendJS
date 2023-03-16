import * as JWTService from "../services/auth/jwt.service.js";
import * as Constants from '../constants/constants.js';
import UserDTO from "../services/userDAOs/userDTO.js";
import { generateToken } from '../utils/jwt.util.js'

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await JWTService.login(email, password);
    if (!user) {
      res.status(401).json({
        error: Constants.LOGIN_INVALID_USER_PASS_ERROR,
        status: Constants.STATUS.FAILED
      });
    } else {
      const token = generateToken(new UserDTO(user))
      res.json({
        message: Constants.LOGIN_SUCCESS,
        token,
        status: Constants.STATUS.SUCCESS
      });
    }
  } catch (error) {
    res.status(500).json({
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
    res.status(500).json({
      error: error.message,
      status: Constants.STATUS.FAILED
    });
  }
}