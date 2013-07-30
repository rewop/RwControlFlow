/**
 *  Script to test libs/Series.js
 */

/*global describe:false, it:false*/

// dependencies
var ControlFlow = require("../controlflow.js");
var expect = require("chai").expect;

// a variable to keep track of the processes running
var runLog = [];
var flow;

describe("Waterfall", function () {

    beforeEach(function () {

        // set up the test variable
        runLog[0] = runLog[1] = runLog[2] = false;

        // build a new controlflow
        flow =  new ControlFlow();
    });

    describe("#run", function() {

        it("should finish correctly all the tasks", function (done) {

            // create the task
            var task = flow.createWaterfall();

            // add a first function
            task.addCallback("function1", function(callback) {

                // nothing should have run yet
                expect(runLog).to.be.deep.equal([false,false,false]);

                // set that we have run
                runLog[0] = true;

                // call the callback
                callback(undefined, "endFunction1");
            });

            // add a second function
            task.addCallback("function2", function(arg1, callback) {

                // only the first function should have run
                expect(runLog).to.be.deep.equal([true,false,false]);

                // test the result of the previous function
                expect(arg1).to.be.equal("endFunction1");

                // set that we have run
                runLog[1] = true;

                // call the callback
                callback(undefined, "endFunction2-1", "endFunction2-2");
            });

            // add a third function
            task.addCallback("function3", function(arg1, arg2, callback){

                // the other functions should have run
                expect(runLog).to.be.deep.equal([true,true,false]);

                // set that we have run
                runLog[2] = true;

                // test the arguments
                expect(arg1).to.be.equal("endFunction2-1");
                expect(arg2).to.be.equal("endFunction2-2");

                // call the callback
                callback(undefined, "endFunction3");
            });

            // once done
            task.onFinish(function(param){

                // everything should have run
                expect(runLog).to.be.deep.equal([true,true,true]);

                // make test
                expect(param).to.be.equals("endFunction3");

                // done
                done();
            });

            // in case of error
            task.onError(function (err) {

                // it should never run
                expect(true).to.be.not.ok;

                // done
                done();
            });

            // run the task
            task.run();
        });

        it("should run onError function, and not onFinish", function (done) {

            // create the task
            var task = flow.createWaterfall();

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

                // should never run
                expect(false).to.be.ok;

                // call the callback
                callback(null, "endFunction2");
            });

            // add a third function
            task.addCallback("function3", function(callback){

                // should never run
                expect(false).to.be.ok;

                // call the callback
                callback(null, "endFunction3");
            });

            // once done
            task.onFinish(function(params){

                // should never run
                expect(false).to.be.ok;

                // done
                done();
            });

            // in case of error
            task.onError(function (err) {

                // it should never run
                expect(err).to.be.instanceOf(Error);

                done();
            });

            // run the task
            task.run();
        });
    });

});