import * as AuthService from "./auth.service.js";
import * as UserService from "../userDAOs/user.service.js";
import { ERRORS } from '../../constants/errors.js';
import CustomError from "../../utils/customError.js";

export async function login(email, password) {
  const isValid = await AuthService.login(email, password);
  if (isValid) {
    const user = await UserService.getUser(email);
    return user;
  } else {
    throw CustomError.createError(ERRORS.LOGIN_INVALID_PASS, null, email);
  }
}