import * as AuthService from "./auth.service.js";
import * as UserService from "../userDAOs/user.service.js";
import { LOGIN_INVALID_USER_PASS_ERROR } from '../../constants/constants.js';

export async function login(email, password) {
  try {
    const isValid = await AuthService.login(email, password);
    if (isValid) {
      const user = await UserService.getUser(email)
      return user;
    } else {
      throw new Error(LOGIN_INVALID_USER_PASS_ERROR)
    }
  } catch (error) {
    throw new Error(error.message);
  }
}