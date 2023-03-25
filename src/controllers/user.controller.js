import { ERRORS } from '../constants/errors.js';
import factory from '../services/factory.js';
import CustomError from '../utils/customError.js';
import * as Constants from './../constants/constants.js';

export async function createUser(req, res, next) {
  const data = req.body;
  try {
    const user = await factory.user.createUser(data);
    delete user.password;
    res.status(201).json({
        user,
        status: Constants.STATUS.SUCCESS
    });
  } catch (error) {
    next(CustomError.createError(ERRORS.UNHANDLED_ERROR, data.email));
  }
}

export async function getUser(req, res, next) {
  const { email } = req.params;
  try {
    const user = await factory.user.getUser(email);
    if(!user) {
      throw CustomError.createError(ERRORS.USER_NOT_FOUND); 
    } else {
      delete user.password;
      res.json({
        user,
        status: Constants.STATUS.SUCCESS
      });
    }  
  } catch (error) {
    if(!error.code) next(CustomError.createError(ERRORS.UNHANDLED_ERROR, email)); else next(error);
  }
}