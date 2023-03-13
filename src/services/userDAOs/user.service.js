import { UserModel } from '../../models/user.model.js';
import { EMAIL_ALREADY_USED } from '../../constants/constants.js';
import bcrypt from 'bcrypt';

export async function createUser(data) {
  try {
    const userRegistered = await getUser(data.email);
    if (userRegistered) {
      throw new Error(EMAIL_ALREADY_USED);
    } else {
      data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
      const user = await UserModel.create(data);
      return user;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUser(email) {
  try {
    const user = await UserModel.find({ email }).lean();
    return user[0];
  } catch (error) {
    throw new Error(error.message);
  }
}