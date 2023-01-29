import * as UserService from "../services/user.service.js";
import { STATUS } from './../constants/constants.js';

export async function createUser(req, res) {
  try {
    const data = req.body;
    const user = await UserService.createUser(data);
    res.status(201).json({
        user,
        status: STATUS.SUCCESS
    });
  } catch (error) {
    res.status(400).json({
        error: error.message,
        status: STATUS.FAILED
    });
  }
}

export async function getUser(req, res) {
  try {
    const { email } = req.params;
    const user = await UserService.getUser(email);
    if (user) {
      delete user.password;
      res.json({
        user,
        status: STATUS.SUCCESS
    })
    }
  } catch (error) {
    res.status(400).json({
        error: error.message,
        status: STATUS.FAILED
    });
  }
}