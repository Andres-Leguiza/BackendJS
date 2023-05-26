import { ERRORS } from '../constants/errors.js';
import CustomError from './../utils/customError.js';
import { HOME, ADMIN } from '../constants/constants.js';

export function handleRoles(validRoles) {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !validRoles.includes(user.role)) {
            throw CustomError.createError(ERRORS.UNAUTHORIZED_OPERATION, null, user.email);
        } else return next();
    }
}

export function handleRolesForView(validRoles) {
    return (req, res, next) => {
        const user = req.user;
        const isAdmin = user?.role === ADMIN;
        if (!user || !validRoles.includes(user.role)) {
            res.render(HOME, { error: ERRORS.UNAUTHORIZED_OPERATION.message, isAdmin, user });
        } else return next();
    }
}