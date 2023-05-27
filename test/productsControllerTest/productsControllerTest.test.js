import chai from "chai";
import sinon from "sinon";
import { getProducts, getProduct } from "../../src/controllers/product.controller.js";
import { ERRORS } from "../../src/constants/errors.js";

const expect = chai.expect;

describe("Products Controller Tests", () => {
    it("test_get_products_with_invalid_query_params", async () => {
        const req = {
            query: {
                invalidParam: "invalidValue"
            },
            user: {
                email: "test@test.com"
            }
        };
        const res = {};
        const next = sinon.spy();

        await getProducts(req, res, next);

        sinon.assert.calledOnce(next);
        sinon.assert.calledWith(next, sinon.match.instanceOf(Error));
    });

    it("test_get_products_with_no_results", async () => {
        const req = {
            query: {
                category: "nonexistentCategory"
            },
            user: {
                email: "test@test.com"
            }
        };
        const res = {};
        const next = sinon.spy();

        await getProducts(req, res, next);

        sinon.assert.calledOnce(next);
        sinon.assert.calledWith(next, sinon.match.instanceOf(Error));
    });

    it("test_get_products_error_handling", async () => {
        const req = {
            query: {},
            user: {
                email: "test@test.com"
            }
        };
        const res = {};
        const next = sinon.spy();

        await getProducts(req, res, next);

        sinon.assert.calledOnce(next);
        sinon.assert.calledWith(next, sinon.match.instanceOf(Error));
    });

    it("test_get_product_with_invalid_pid", async () => {
        const req = { params: { pid: null }, user: { email: "test@test.com" } };
        const res = {};
        const next = sinon.spy();
        
        try {
            await getProduct(req, res, next);
        } catch (error) {
            expect(error.message).to.equal(ERRORS.PRODUCT_NOT_FOUND.message);
            expect(error.code).to.equal(ERRORS.PRODUCT_NOT_FOUND.code);
            expect(error.status).to.equal(ERRORS.PRODUCT_NOT_FOUND.status);
            expect(error.user).to.equal(req.user.email);
            sinon.assert.notCalled(next);
        }
    });
});