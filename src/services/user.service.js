import { UserModel } from '../models/user.model.js';
import { EMAIL_ALREADY_USED } from '../constants/constants.js'

export async function createUser(data) {
  try {
    const userRegistered = await getUser(data.email);
    if (userRegistered) {
      throw new Error(EMAIL_ALREADY_USED);
    } else {
      const user = await UserModel.create(data);
      return user._doc;
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