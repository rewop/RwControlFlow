// the object to test
var ControlFlow = require("../../controlflow.js");
var flow;

// a variable to keep track of the processes running
var runLog = [];

exports.group = {
    setUp: function(callback) {

        // set up the test variable
        runLog[0] = runLog[1] = runLog[2] = false;

        // build a new controlflow
        flow =  new ControlFlow();

        // done setting up
        callback();
    },
    waterfallFinish: function(test) {
        // create the task
        var task = flow.createWaterfall();

        // add a first function
        task.addCallback("function1", function(callback) {

            // nothing should have run yet
            test.ok(!runLog[0] && !runLog[1] && !runLog[2]);

            // set that we have run
            runLog[0] = true;

            // call the callback
            callback(null, "endFunction1");
        });

        // add a second function
        task.addCallback("function2", function(arg1, callback) {

            // only the first function should have run
            test.ok(runLog[0] && !runLog[1] && !runLog[2]);

            // see that we have run
            test.ok(runLog[0]);

            // test the arguments
            test.equals(arg1, "endFunction1");

            // set that we have run
            runLog[1] = true;

            // call the callback
            callback(null, "endFunction2-1", "endFunction2-2");
        });

        // add a third function
        task.addCallback("function3", function(arg1, arg2, callback){

            // the other functions should have run
            test.ok(runLog[0] && runLog[1] && !runLog[2]);

            // set that we have run
            runLog[2] = true;

            // test the arguments
            test.equals(arg1, "endFunction2-1");
            test.equals(arg2, "endFunction2-2");

            // call the callback
            callback(null, "endFunction3");
        });

        // once done
        task.onFinish(function(param){

            // everything should have run
            test.ok(runLog[0] && runLog[1] && runLog[2]);

            // make test
            test.equals(param, "endFunction3");

            // done
            test.done();
        });

        // in case of error
        task.onError(function (err) {

            // it should never run
            test.ok(false);

            test.done();
        });

        // run the task
        task.run();
    },
    waterfallError: function(test) {
        // create the task
        var task = flow.createWaterfall();

        // add a first function
        task.addCallback("function1", function(callback) {

            // nothing should have run yet
            test.ok(!runLog[0] && !runLog[1] && !runLog[2]);

            // set that we have run
            runLog[0] = true;

            // call the callback
            callback(new Error("errorFunction1"), "endFunction1");
        });

        // add a second function
        task.addCallback("function2", function(callback) {

            // should never run
            test.ok(false);

            // call the callback
            callback(null, "endFunction2");
        });

        // add a third function
        task.addCallback("function3", function(callback){

            // should never run
            test.ok(false);

            // call the callback
            callback(null, "endFunction3");
        });

        // once done
        task.onFinish(function(params){

            // should never run
            test.ok(false);

            // done
            test.done();
        });

        // in case of error
        task.onError(function (err) {

            // it should never run
            test.ok(err instanceof Error);

            test.done();
        });

        // run the task
        task.run();
    }
};