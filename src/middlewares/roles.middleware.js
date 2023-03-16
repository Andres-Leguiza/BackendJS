
import { STATUS, USER, ADMIN, UNAUTHORIZED_OPERATION } from '../constants/constants.js';

export function adminRole(req, res, next) {
    const user = req.user;
    if (!user || user.role !== ADMIN) {
        res.status(403).json({
            message: UNAUTHORIZED_OPERATION,
            status: STATUS.FAILED
        });
    } else return next();
}

export function userRole(req, res, next) {
    const user = req.user;
    if (!user || user.role !== USER) {
        res.status(403).json({
            message: UNAUTHORIZED_OPERATION,
            status: STATUS.FAILED
        });
    } else return next();
}