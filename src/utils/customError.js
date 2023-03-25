export default class CustomError {
    static createError(errorDetails, user){
        const error = new Error(errorDetails.message);
        error.code = errorDetails.code;
        error.status = errorDetails.status;
        error.user = user;
        return error;
    }
}