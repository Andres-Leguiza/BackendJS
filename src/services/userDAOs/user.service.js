import { UserModel } from '../../models/user.model.js';
import { USER, PREMIUM } from '../../constants/constants.js';
import { ERRORS } from '../../constants/errors.js';
import bcrypt from 'bcrypt';
import moment from 'moment';
import CustomError from '../../utils/customError.js';
import EmailSender from '../../utils/emailSender.js';

export async function getUsers() {
  return await UserModel.find({ deletedAt: { $exists: false } });
}

export async function createUser(data) {
  const userAlreadyRegistered = await getUser(data.email);
  if (userAlreadyRegistered) {
    throw CustomError.createError(ERRORS.EMAIL_ALREADY_USED, null, data.email);
  } else {
    data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
    const user = await UserModel.create(data);
    return user;
  }
}

export async function getUser(email) {
    const user = await UserModel.find({ email, deletedAt: { $exists: false } }).lean();
    return user[0];
}

export async function getUserById(id) {
  const user = await UserModel.find({ _id: id }).lean();
  return user[0];
}

export async function updateUser(email, data, updatePassword = false){
  if(updatePassword){
    if(await validPassword(email, data.password)) data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
  } else {
    delete data.password;
  }
  return await UserModel.findOneAndUpdate({ email }, data, { new: true });
}

export async function updateLastConnection(email){
  await UserModel.findOneAndUpdate({ email }, { last_connection: Date.now() });
}

export async function deleteUser(email){
  await UserModel.delete({ email });
}

export async function deleteUsers(){
  let date = moment().subtract(2, 'days').toDate();
  const conditions = { last_connection: { $lte: date }, role: { $in: [ USER, PREMIUM ] } };
  const users = await UserModel.find({ ...conditions, deletedAt: { $exists: false } });
  await UserModel.delete({ ...conditions });
  users.forEach(user => sendEmail(user._doc));
  return users;
}

async function validPassword(email, newPassword){
  const user = await getUser(email);
  if(user){
    if(bcrypt.compareSync(newPassword, user.password)) throw CustomError.createError(ERRORS.PASSWORD_ALREADY_USED, null, email);
  } else throw CustomError.createError(ERRORS.USER_NOT_FOUND, null, email);
  return true;
}

function sendEmail(user){
  EmailSender.sendUserDeletionEmail(user);
}