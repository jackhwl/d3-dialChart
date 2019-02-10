var assert = require("assert");
var ReviewProcess = require("../processes/review");
var MembershipApplication = require("../models/membership_application");

describe("The Review Process", () => {
    describe("Receiving a valid application", () => {
        var decision;
        before((done)=>{
            validApp = new MembershipApplication({
                first: "Test",
                last: "User",
                email: "test@test.com",
                age: 30,
                height: 66,
                weight: 180
            });
            var review = new ReviewProcess();
            review.processApplication(validApp, (err, result) => {
                decision = result;
                done();
            });
        });

        it('returns success', () => {
            assert(decision.success, decision.message);
        });
    });
});