import * as JWTService from "../services/auth/jwt.service.js";
import * as Constants from '../constants/constants.js';
import UserDTO from "../services/userDAOs/userDTO.js";
import { ERRORS } from "../constants/errors.js";
import CustomError from "../utils/customError.js";
import { generateToken } from '../utils/jwt.util.js';

export async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await JWTService.login(email, password);
    const token = generateToken(new UserDTO(user));
    res.json({
      message: Constants.LOGIN_SUCCESS,
      token,
      status: Constants.STATUS.SUCCESS
    });
  } catch (error) {
    if(!error.code) next(CustomError.createError(ERRORS.UNHANDLED_ERROR, email)); else next(error);
  }
}