import chai from "chai";
import sinon from "sinon";
import factory from '../../src/services/factory.js';
import { STATUS } from './../../src/constants/constants.js';

const expect = chai.expect;

describe("Cart Controller Tests", () => {
    it("test_get_cart_success", async () => {
        const req = { params: { cid: "123" }, user: { email: "test@test.com" } };
        const res = { json: sinon.spy() };
        const next = sinon.spy();
        const cart = { id: "123", products: [{ product: "456", quantity: 2 }] };
        factory.cart.getCart = sinon.stub().returns(cart);

        await getCart(req, res, next);

        sinon.assert.calledOnce(factory.cart.getCart);
        sinon.assert.calledWith(factory.cart.getCart, "123");
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, { cart, status: STATUS.SUCCESS });
        sinon.assert.notCalled(next);
    });

    it("test_get_cart_not_found", async () => {
        const req = { params: { cid: "123" }, user: { email: "test@test.com" } };
        const res = { json: sinon.spy() };
        const next = sinon.spy();
        factory.cart.getCart = sinon.stub().returns(null);

        await getCart(req, res, next);

        sinon.assert.calledOnce(factory.cart.getCart);
        sinon.assert.calledWith(factory.cart.getCart, "123");
        sinon.assert.calledOnce(next);
        sinon.assert.calledWith(next, sinon.match.instanceOf(Error));
    });

    it("test_get_cart_custom_error_message", async () => {
        const req = { params: { cid: "123" }, user: { email: "test@test.com" } };
        const res = { json: sinon.spy() };
        const next = sinon.spy();
        factory.cart.getCart = sinon.stub().returns(null);

        try {
            await getCart(req, res, next);
        } catch (error) {
            expect(error.message).to.equal(ERRORS.CART_NOT_FOUND.message);
        }
    });

    it("test_get_cart_error_handling", async () => {
        const req = { params: { cid: "123" }, user: { email: "test@test.com" } };
        const res = { json: sinon.spy() };
        const next = sinon.spy();
        const error = new Error("Test Error");
        factory.cart.getCart = sinon.stub().throws(error);

        await getCart(req, res, next);

        sinon.assert.calledOnce(factory.cart.getCart);
        sinon.assert.calledWith(factory.cart.getCart, "123");
        sinon.assert.calledOnce(next);
        sinon.assert.calledWith(next, error);
    });

    it("test_get_cart_custom_error_status", async () => {
        const req = { params: { cid: "123" }, user: { email: "test@test.com" } };
        const res = { json: sinon.spy() };
        const next = sinon.spy();
        factory.cart.getCart = sinon.stub().returns(null);

        try {
            await getCart(req, res, next);
        } catch (error) {
            expect(error.status).to.equal(ERRORS.CART_NOT_FOUND.status);
        }
    });

    it("test_get_cart_custom_error_user", async () => {
        const req = { params: { cid: "123" }, user: { email: "test@test.com" } };
        const res = { json: sinon.spy() };
        const next = sinon.spy();
        factory.cart.getCart = sinon.stub().returns(null);

        try {
            await getCart(req, res, next);
        } catch (error) {
            expect(error.user).to.equal("test@test.com");
        }
    });
});