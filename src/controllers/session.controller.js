import { ERRORS } from '../constants/errors.js';
import CustomError from '../utils/customError.js';
import { VALID_TOKEN } from './../constants/constants.js';

export function getCurrentUser(req, res) {
  try {  
    res.json({
          message: VALID_TOKEN, 
          user: req.user
    });
  } catch (error){
      throw CustomError.createError(ERRORS.UNHANDLED_ERROR);
  }
}