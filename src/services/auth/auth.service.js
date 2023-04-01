import * as UserService from '../userDAOs/user.service.js';
import { ERRORS } from '../../constants/errors.js';
import CustomError from '../../utils/customError.js';
import bcrypt from 'bcrypt';

export async function login(email, password) {
    const user = await UserService.getUser(email);  
    if (!user) {
      throw CustomError.createError(ERRORS.USER_NOT_REGISTERED, null, email);
    } else if (user.githubUser){
      throw CustomError.createError(ERRORS.GITHUB_USER, null, email);
    } else {
      return bcrypt.compareSync(password, user.password);
    }
}