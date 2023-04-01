import { STATUS } from "../constants/constants.js";
import logger from "../utils/logger.js";
export default (error, req, res, next) => {
    if(error.status === 500){
        logger.error(`Message: ${error.detail} - Message Code: ${error.code} - Path: ${req.path} - Status Code: ${error.status} - User: ${error.user}`)
    } else {
        logger.warning(`Message: ${error.message} - Message Code: ${error.code} - Path: ${req.path} - Status Code: ${error.status} - User: ${error.user}`)
    }
    res.status(error.status).json({
        code: error.code,
        error: error.message,
        status: STATUS.FAILED
    });
    next();
};