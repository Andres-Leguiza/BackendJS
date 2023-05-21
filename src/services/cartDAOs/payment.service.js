import Stripe from "stripe";
import config from "../../config/config.js";

class PaymentService {
    constructor() {
        this.stripe = new Stripe(config.stripeSecret);
    }
    createPaymentIntent = async(data) => {
        return this.stripe.paymentIntents.create(data);
    }
} 

export default new PaymentService();