/**
 *  Script to test ControlFlow.js
 */

/*global describe:false, it:false*/

// dependencies
var ControlFlow = require("../ControlFlow.js");
var Parallel = require("../libs/Parallel.js");
var Series = require("../libs/Series.js");
var Waterfall = require("../libs/Waterfall.js");

// we use chai to test
var expect = require("chai").expect;

// the control flow object
var flow;

describe("ControlFlow", function () {

    beforeEach(function() {

        // build a new controlflo
        flow = new ControlFlow();
    });

    describe("#createSeries()", function () {

        it("should create a Series object", function () {

            // create the series task
            var task = flow.createSeries();

            // it should be an instance of Series
            expect(task).to.be.instanceOf(Series);

            // it should have a function to add a callback
            expect(task).to.respondTo("addCallback");

            // it should have a function to add an onFinish callback
            expect(task).to.respondTo("onFinish");

            // it should have a function to add an onError callback
            expect(task).to.respondTo("onError");

            // it should have a function to run the task
            expect(task).to.respondTo("run");
        });
    });

    describe("#createWaterfall()", function () {

        it("should create a Waterfall object", function () {

            // create the series task
            var task = flow.createWaterfall();

            // it should be an instance of Series
            expect(task).to.be.instanceOf(Waterfall);

            // it should have a function to add a callback
            expect(task).to.respondTo("addCallback");

            // it should have a function to add an onFinish callback
            expect(task).to.respondTo("onFinish");

            // it should have a function to add an onError callback
            expect(task).to.respondTo("onError");

            // it should have a function to run the task
            expect(task).to.respondTo("run");
        });
    });

    describe("#createParallel()", function () {

        it("should create a Parallel object", function () {

            // create the series task
            var task = flow.createParallel();

            // it should be an instance of Series
            expect(task).to.be.instanceOf(Parallel);

            // it should have a function to add a callback
            expect(task).to.respondTo("addCallback");

            // it should have a function to add an onFinish callback
            expect(task).to.respondTo("onFinish");

            // it should have a function to add an onError callback
            expect(task).to.respondTo("onError");

            // it should have a function to run the task
            expect(task).to.respondTo("run");
        });
    });
});


