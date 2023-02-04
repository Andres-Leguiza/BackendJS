import * as UserService from '../services/user.service.js';
import { USER_NOT_REGISTERED } from '../constants/constants.js'

export async function login(email, password) {
  try {
    const user = await UserService.getUser(email);
    if (!user) {
      throw new Error(USER_NOT_REGISTERED);
    } else {
      return password === user.password;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}