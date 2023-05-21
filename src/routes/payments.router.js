import { Router } from "express";
import factory from "../services/factory.js";
import CustomError from '../utils/customError.js';
import { handleRoles } from '../middlewares/roles.middleware.js';
import passport from '../utils/passport.util.js';
import { STATUS, USER, PREMIUM, CARTS_UNAUTHENTICATED } from '../constants/constants.js';
import { ERRORS } from '../constants/errors.js';
import PaymentService from "../services/cartDAOs/payment.service.js";


const paymentsRouter = new Router();

paymentsRouter.all("/unauthenticated", () => { throw CustomError.createError(ERRORS.MISSING_INVALID_TOKEN) });
paymentsRouter.post('/payment-intents/:cid', passport.authenticate('current', { session: false, failureRedirect: CARTS_UNAUTHENTICATED }),
                                        handleRoles([USER, PREMIUM]), async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await factory.cart.getCart(cid);
        if(!cart) throw CustomError.createError(ERRORS.CART_NOT_FOUND, null, req.user?.email);
        let amount = 0;
        cart.products.forEach( cartItem => { amount += cartItem.product.price });
        const paymentIntentInfo = {
            amount: amount*100,
            currency: "usd",
            metadata: {
                userEmail: req.user.email
            }
        }
        let result = await PaymentService.createPaymentIntent(paymentIntentInfo);
        res.json({
            status: STATUS.SUCCESS,
            payload: result
        });
    } catch (error){
        if(!error.code) next(CustomError.createError(ERRORS.UNHANDLED_ERROR, error.message, req.user?.email)); else next(error);
    }
});
export default paymentsRouter;