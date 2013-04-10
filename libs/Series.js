
// dependencies
var Task = require('./Task.js');

/**
 * A series task that runs a sequence of async function in series.
 *
 * @class Series
 * @constructor
 */
function Series () {
    
    /**
     * The series
     *
     * @attribute task
     * @type {Task}
     */
    var task = new Task();

    /**
     * Adds a callback to the task
     *
     * @method addCallback
     * @param {string} name
     * @param {function} callback
     */
    this.addCallback = function (name, callback) {

        // add the callback to the task
        task.addCallback(name, callback);
    };

    /**
     * Run the task
     *
     * @method run
     */
    this.run = function () {

        // run the task as series
        task.run('series');
    };

    /**
     * Register an on finish function.
     * 
     * @method onFinish
     * @param {function} callback
     */
    this.onFinish = function (callback) {

        // register the function
        task.onFinish(callback);
    };

    /**
     * Register the function to be called in case of error.
     * 
     * @method onError
     * @param {function} callback
     */
    this.onError = function (callback) {

        // register the function
        task.onError(callback);
    };
}

// export the constructor
module.exports = Series;