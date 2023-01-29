import * as UserService from "../services/user.service.js";

export async function login(email, password) {
  try {
    const user = await UserService.getUser(email);
    if (!user) {
      throw new Error("User is not registered.");
    } else {
      if (password === user.password) {
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
}