import { UserModel } from '../../models/user.model.js';
import { ERRORS } from '../../constants/errors.js';
import bcrypt from 'bcrypt';
import CustomError from '../../utils/customError.js';

export async function createUser(data) {
  const userRegistered = await getUser(data.email);
  if (userRegistered) {
    throw CustomError.createError(ERRORS.EMAIL_ALREADY_USED, null, data.email);
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

export async function updateUser(email, data, updatePassword = false){
  if(updatePassword){
    if(await validPassword(email, data.password)) data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
  } else {
    delete data.password;
  }
  const user = await UserModel.findOneAndUpdate({ email }, data, { new: true });
  return user;
}

async function validPassword(email, newPassword){
  const user = await getUser(email);
  if(user){
    if(bcrypt.compareSync(newPassword, user.password)) throw CustomError.createError(ERRORS.PASSWORD_ALREADY_USED, null, email);
  } else throw CustomError.createError(ERRORS.USER_NOT_FOUND, null, email);
  return true;
}