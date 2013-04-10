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
    seriesFinish: function(test) {
        // create the task
        var task = flow.createSeries();

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
        task.addCallback("function2", function(callback) {

            // only the first function should have run
            test.ok(runLog[0] && !runLog[1] && !runLog[2]);

            // set that we have run
            runLog[1] = true;

            // call the callback
            callback(null, "endFunction2");
        });

        // add a third function
        task.addCallback("function3", function(callback){

            // the other functions should have run
            test.ok(runLog[0] && runLog[1] && !runLog[2]);

            // set that we have run
            runLog[2] = true;

            // call the callback
            callback(null, "endFunction3");
        });

        // once done
        task.onFinish(function(params){

            // everything should have run
            test.ok(runLog[0] && runLog[1] && runLog[2]);

            // test the first parameter
            test.ok(params.hasOwnProperty("function1"));
            test.equals(params.function1, "endFunction1");

            // test the second parameter
            test.ok(params.hasOwnProperty("function2"));
            test.equals(params.function2, "endFunction2");

            // test the third parameter
            test.ok(params.hasOwnProperty("function3"));
            test.equals(params.function3, "endFunction3");

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
    seriesError: function(test) {
        // create the task
        var task = flow.createSeries();

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