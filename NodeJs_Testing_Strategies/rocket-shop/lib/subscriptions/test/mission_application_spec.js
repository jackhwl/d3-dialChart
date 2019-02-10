var assert = require("assert");
var MembershipApplication = require('../models/membership_application');

describe("Membership application requirements", () => {
    var validApp;
    before(() => {
        validApp = new MembershipApplication({
            first: "Test",
            last: "User",
            email: "test@test.com",
            age: 30,
            height: 66,
            weight: 180
        });
    });

    describe("Allication valid if...", () => {
        it("all validators successful", () => {
            assert(validApp.isValid());
        });
    });

    describe("Allication invalid if...", () => {
        it("is expired", () => {
            var app = new MembershipApplication({validUntil: Date.parse("01/01/2010")});
            assert(app.expired());
        });

        it('email is 4 characters or less', function () {
            var app = new MembershipApplication({ email: "dd" });
            assert(!app.emailIsValid());
        });
        it('email does not contain an @', function () {
            var app = new MembershipApplication({ email: "thingthingthing:thing.com" });
            assert(!app.emailIsValid());
        });
        it('email is omitted', function () {
            var app = new MembershipApplication();
            assert(!app.emailIsValid());
        });
        it('height is less than 60 inches', function () {
            var app = new MembershipApplication({ height: 10 });
            assert(!app.heightIsValid());
        });
        it('height is more than 75 inches', function () {
            var app = new MembershipApplication({ height: 80 });
            assert(!app.heightIsValid());
        });
        it('height is omitted', function () {
            var app = new MembershipApplication();
            assert(!app.heightIsValid());
        });
        it('age is more than 100', function () {
            var app = new MembershipApplication({ age: 101 });
            assert(!app.ageIsValid());
        });
        it('age less than 15', function () {
            var app = new MembershipApplication({ age: 14 });
            assert(!app.ageIsValid());
        });
        it('age is omitted', function () {
            var app = new MembershipApplication();
            assert(!app.ageIsValid());
        });
        it('weight less than 100', function () {
            var app = new MembershipApplication({ weight: 99 });
            assert(!app.weightIsValid());
        });
        it('weight less more than 300', function () {
            var app = new MembershipApplication({ weight: 301 });
            assert(!app.weightIsValid());
        });
        it('weight is omitted', function () {
            var app = new MembershipApplication({ weight: 301 });
            assert(!app.weightIsValid());
        });
        it('first is omitted', function () {
            var app = new MembershipApplication();
            assert(!app.nameIsValid());
        });
        it('last is omitted', function () {
            var app = new MembershipApplication();
            assert(!app.nameIsValid());
        });

    });
});
