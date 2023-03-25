export const ERRORS = {
    UNHANDLED_ERROR: { message: "Unhandled Error.", code: "ERR_000", status: 500 },
    LOGIN_INVALID_PASS: { message: "Invalid Password.", code: "ERR_001", status: 401 },
    USER_NOT_FOUND: { message: "User was not found.", code: "ERR_002", status: 404 },
    CARTS_NOT_FOUND: { message: "Carts were not found.", code: "ERR_003", status: 404 },
    CART_NOT_FOUND: { message: "Cart was not found.", code: "ERR_004", status: 404 },
    INVALID_INPUT_PRODUCT: { message: "There are invalid fields for this product.", code: "ERR_005", status: 400 },
    PRODUCTS_NOT_FOUND: { message: "Products were not found.", code: "ERR_006", status: 404 },
    PRODUCT_NOT_FOUND: { message: "Product was not found.", code: "ERR_007", status: 404 },
    PRODUCT_NOT_FOUND_OR_DELETED: { message: "Product was not found or already deleted.", code: "ERR_008", status: 404 },
    UNAUTHENTICATED: { message: "User is not authenticated.", code: "ERR_009", status: 401 },
    UNAUTHORIZED_USER: { message: "You don't have access to this resource.", code: "ERR_010", status: 403 },
    UNAUTHORIZED_OPERATION: { message: "You don't have access to perform this operation.", code: "ERR_011", status: 403 },
    MISSING_INVALID_TOKEN: { message: "Missing or Invalid Token.", code: "ERR_012", status: 400 },
    USER_NOT_REGISTERED: { message: "User is not registered.", code: "ERR_013", status: 404 }, 
    GITHUB_USER: { message: "Email registered with Github, please sign in accordingly.", code: "ERR_014", status: 400 },
    EMAIL_ALREADY_USED: { message: "This email address is already in use.", code: "ERR_015", status: 400 },
    GITHUB_ERROR_MESSAGE: { message: "Cannot log you in through GitHub at this moment.", code: "ERR_016", status: 500 }
};