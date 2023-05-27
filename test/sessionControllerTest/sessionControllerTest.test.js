import chai from "chai";
import sinon from "sinon";
import { getCurrentUser } from "../../src/controllers/session.controller.js";
import { VALID_TOKEN } from "../../src/constants/constants.js";

const expect = chai.expect;

describe("Session Controller Tests", () => {
    it("test_happy_path_get_current_user: should return a JSON object with message and user", () => {
        // Given
        const req = { user: { name: "John Doe" } };
        const res = { json: sinon.spy() };

        // When
        getCurrentUser(req, res);

        // Then
        expect(res.json.calledOnce).to.be.true;
        expect(res.json.calledWithExactly({ message: VALID_TOKEN, user: req.user })).to.be.true;
    });

    it("test_happy_path_get_current_user_message: should return a JSON object with message equal to VALID_TOKEN", () => {
        // Given
        const req = { user: { name: "John Doe" } };
        const res = { json: sinon.spy() };

        // When
        getCurrentUser(req, res);

        // Then
        expect(res.json.calledOnce).to.be.true;
        expect(res.json.calledWith(sinon.match({ message: VALID_TOKEN }))).to.be.true;
    });

    it("test_edge_case_get_current_user_error_message: should throw an error with message equal to the error thrown", () => {
        // Given
        const req = { user: { name: "John Doe" } };
        const errorMessage = "Unhandled Error.";
        const res = { json: sinon.stub().throws(new Error(errorMessage)) };

        // When, Then
        expect(() => getCurrentUser(req, res)).to.throw(Error).with.property("message", errorMessage);
    });

    it("test_general_behavior_get_current_user: should handle a request and response object", () => {
        // Given
        const req = { user: { name: "John Doe" } };
        const res = { json: sinon.spy() };

        // When
        getCurrentUser(req, res);

        // Then
        expect(res.json.calledOnce).to.be.true;
    });

    it("test_happy_path_get_current_user_user: should return a JSON object with user equal to req.user", () => {
        // Given
        const req = { user: { name: "John Doe" } };
        const res = { json: sinon.spy() };

        // When
        getCurrentUser(req, res);

        // Then
        expect(res.json.calledOnce).to.be.true;
        expect(res.json.calledWith(sinon.match({ user: req.user }))).to.be.true;
    });
});