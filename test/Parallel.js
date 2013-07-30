/**
 *  Script to test libs/Series.js
 */

/*global describe:false, it:false*/

// dependencies
var ControlFlow = require("../ControlFlow.js");
var expect = require("chai").expect;

// a variable to keep track of the processes running
var runLog = [];
var flow;

describe("Parallel", function () {

    beforeEach(function() {

        // set up the test variable
        runLog[0] = runLog[1] = runLog[2] = false;

        // build a new controlflow
        flow = new ControlFlow();
    });

    describe("#run", function () {

        it("should finish correctly the parallel tasks without limits", function (done) {

            // create the series task
            var task = flow.createParallel();

            // let's add a first function to the task
            task.addCallback("function1", function(callback) {

                // this function has run
                runLog[0] = true;

                // we are done, let's call the callback with a fake result
                callback(undefined, "endFunction1");
            });

            // let's add a second function to the task
            task.addCallback("function2", function(callback) {

                // this function has run
                runLog[1] = true;

                // we are done, let's call the callback with a fake result
                callback(undefined, "endFunction2");
            });

            // let's add a third function
            task.addCallback("function3", function(callback) {

                // let's run the function
                runLog[2] = true;

                // let's call the callback
                callback(undefined, "endFunction3");
            });

            // once done we make some checks
            task.onFinish(function(params) {

                // everything should have run
                expect(runLog).to.be.deep.equal([true,true,true]);

                // let's test the result of the first function
                expect(params).to.have.property("function1", "endFunction1");

                // let's check the result of the second function
                expect(params).to.have.property("function2", "endFunction2");

                // let's check the third result
                expect(params).to.have.property("function3","endFunction3");

                // done
                done();
            });

            // let's register a callback in case of error
            task.onError(function (err) {

                // the error should never run
                expect(true).to.be.not.ok;
            });

            // we can run the task
            task.run();
        });

        it("should run parallel tasks limited to a certain number", function (done) {

            // create the task
            var task = flow.createParallel();

            // let's add a first function to the task
            task.addCallback("function1", function(callback) {

                // this function has run
                runLog[0] = true;

                // the third task should not have been run yet
                expect(runLog[2]).to.be.not.ok;

                // we are done, let's call the callback with a fake result
                callback(undefined, "endFunction1");
            });

            // let's add a second function to the task
            task.addCallback("function2", function(callback) {

                // this function has run
                runLog[1] = true;

                // the third task should not have been run yet
                expect(runLog[2]).to.be.not.ok;

                // we are done, let's call the callback with a fake result
                callback(undefined, "endFunction2");
            });

            // let's add a third function
            task.addCallback("function3", function(callback) {

                // let's run the function
                runLog[2] = true;

                // the proevious two callbacks should have run by now
                expect(runLog[0]).to.be.ok;
                expect(runLog[1]).to.be.ok;

                // let's call the callback
                callback(undefined, "endFunction3");
            });

            // once done we make some checks
            task.onFinish(function(params) {
                
                // everything should have run
                expect(runLog).to.be.deep.equal([true,true,true]);

                // let's test the result of the first function
                expect(params).to.have.property("function1", "endFunction1");

                // let's check the result of the second function
                expect(params).to.have.property("function2", "endFunction2");

                // let's check the third result
                expect(params).to.have.property("function3","endFunction3");

                // done
                done();
            });

            // let's register a callback in case of error
            task.onError(function (err) {

                // the error should never run
                expect(true).to.be.not.ok;
            });

            // we can run the task limited by 2
            task.run(2);
        });

        it("should return an error and never run the onFinish callback", function (done) {

            // create the task
            var task = flow.createParallel();

            // add a first function
            task.addCallback("function1", function(callback) {

                // nothing should have run yet
                expect(runLog).to.be.deep.equal([false,false,false]);

                // set that we have run
                runLog[0] = true;

                // call the callback
                callback(new Error("errorFunction1"), "endFunction1");
            });

            // add a second function
            task.addCallback("function2", function(callback) {

                // call the callback
                callback(undefined, "endFunction2");
            });

            // add a third function
            task.addCallback("function3", function(callback){

                // call the callback
                callback(null, "endFunction3");
            });

            // once done
            task.onFinish(function(params){

                // should never run
                expect(true).to.be.not.ok;

                // done
                done();
            });

            // in case of error
            task.onError(function (err) {

                // it should never run
                expect(err).to.be.instanceOf(Error);

                // done
                done();
            });

            // run the task
            task.run();
        });
    });

});
