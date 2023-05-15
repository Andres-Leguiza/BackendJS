import { ERRORS } from '../constants/errors.js';
import CustomError from './../utils/customError.js';

export function handleRoles(validRoles) {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !validRoles.includes(user.role)) {
            throw CustomError.createError(ERRORS.UNAUTHORIZED_OPERATION, null, user.email);
        } else return next();
    }
}