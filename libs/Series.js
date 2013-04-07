
// dependencies
var Task = require('./Task.js');

/**
 * A series task that runs a sequence of async function in series.
 *
 * @class
 * 
 */
function Series () {
    
    /**
     * The series
     */
    var task = new Task();

    /**
     * Adds a callback to the task
     *
     * @param {string} name
     * @param {function} callback
     */
    this.addCallback = function (name, callback) {

        // add the callback to the task
        task.addCallback(name, callback);
    };

    /**
     * Run the task
     */
    this.run = function () {

        // run the task as series
        task.run('series');
    };

    /**
     * Register an on finish function.
     * 
     * @param {function} callback
     */
    this.onFinish = function (callback) {

        // register the function
        task.onFinish(callback);
    };

    /**
     * Register the function to be called in case of error.
     * 
     * @param {function} callback
     */
    this.onError = function (callback) {

        // register the function
        task.onError(callback);
    };
}