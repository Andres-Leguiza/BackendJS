import { Router } from 'express';
import { ERRORS } from '../constants/errors.js';
import CustomError from '../utils/customError.js';

const loggerTestRouter = Router();

loggerTestRouter.get("/loggerTest", (req, res) => {
    try {
        logger.debug("Debug Log");
        logger.http("HTTP Log");
        logger.info("Info Log");
        logger.warning("Warning Log");
        logger.error("Error Log");
        logger.fatal("Fatal Log");
        res.send("Successful Logger Test");
    } catch(error){
        throw CustomError.createError(ERRORS.UNHANDLED_ERROR, error.message);
    }
});

export default loggerTestRouter;