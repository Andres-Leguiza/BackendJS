import factory from '../services/factory.js';
import * as Constants from './../constants/constants.js';

export async function createUser(req, res) {
  try {
    const data = req.body;
    const user = await factory.user.createUser(data);
    delete user.password;
    res.status(201).json({
        user,
        status: Constants.STATUS.SUCCESS
    });
  } catch (error) {
    res.status(500).json({
        error: error.message,
        status: Constants.STATUS.FAILED
    });
  }
}

export async function getUser(req, res) {
  try {
    const { email } = req.params;
    const user = await factory.user.getUser(email);
    if (!user) {
      res.status(404).json({
        error: Constants.USER_NOT_FOUND,
        status: Constants.STATUS.FAILED
      });
    } else {
      delete user.password;
      res.json({
        user,
        status: Constants.STATUS.SUCCESS
      });
    }
  } catch (error) {
    res.status(500).json({
        error: error.message,
        status: Constants.STATUS.FAILED
    });
  }
}