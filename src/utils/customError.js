export default class CustomError {
    static createError(errorDetails, detail, user){
        const error = new Error(errorDetails.message);
        error.detail = detail;
        error.code = errorDetails.code;
        error.status = errorDetails.status;
        error.user = user;
        return error;
    }
}