var assert = require("assert");
var ReviewProcess = require("../processes/review");
var MembershipApplication = require("../models/membership_application");
var sinon = require("sinon");

describe("The Review Process", () => {
    describe("Receiving a valid application", () => {
        var decision;
        var validApp = new MembershipApplication({
            first: "Test",
            last: "User",
            email: "test@test.com",
            age: 30,
            height: 66,
            weight: 180
        });
        var review = new ReviewProcess({application: validApp});
        sinon.spy(review, "ensureAppValid");
        sinon.spy(review, "findNextMission");
        sinon.spy(review, "roleIsAvailable");
        sinon.spy(review, "ensureRoleCompatible");
        before((done)=>{
            review.processApplication((err, result) => {
                decision = result;
                done();
            });
        });

        it('returns success', () => {
            assert(decision.success, decision.message);
        });
        it('ensures the application is valid', () => {
            assert(review.ensureAppValid.called);
        });
        it('selects a mission', () => {
            assert(review.findNextMission.called);
        });
        it('ensures a role exists', () => {
            assert(review.roleIsAvailable.called);
        });
        it('ensures role compatibility', () => {
            assert(review.ensureRoleCompatible.called);
        });
    });
});