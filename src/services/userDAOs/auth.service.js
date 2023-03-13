import * as UserService from './user.service.js';
import { USER_NOT_REGISTERED, GITHUB_USER } from '../../constants/constants.js';
import bcrypt from 'bcrypt';

export async function login(email, password) {
  try {
    const user = await UserService.getUser(email);
    if (!user) {
      throw new Error(USER_NOT_REGISTERED);
    } else if (user.githubUser){
      throw new Error(GITHUB_USER);
    } else {
      return bcrypt.compareSync(password,user.password);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}