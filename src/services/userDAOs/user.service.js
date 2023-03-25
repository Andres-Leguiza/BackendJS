import { UserModel } from '../../models/user.model.js';
import { ERRORS } from '../../constants/errors.js';
import bcrypt from 'bcrypt';
import CustomError from '../../utils/customError.js';

export async function createUser(data) {
  const userRegistered = await getUser(data.email);
  if (userRegistered) {
    throw CustomError.createError(ERRORS.EMAIL_ALREADY_USED);
  } else {
    data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
    const user = await UserModel.create(data);
    return user;
  }
}

export async function getUser(email) {
    const user = await UserModel.find({ email }).lean();
    return user[0];
}