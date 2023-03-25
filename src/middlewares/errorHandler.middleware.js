import { STATUS } from "../constants/constants.js";
export default (error, req, res, next) => {
    console.log(
        "Message:", error.message,
        "- Message Code:", error.code,
        "- Path:", req.path,
        "- Status Code:", error.status,
        "- User:", error.user
    );
    res.status(error.status).json({
        code: error.code,
        error: error.message,
        status: STATUS.FAILED
    });
    next();
};