// dependencies
var async = require('async');

/**
 * Base class for a task. This class should be used only inside the module
 *
 * @class Task
 * @constructor
 */
function Task () {

    /**
     * The function to be called when an error occurs in the task
     * 
     * @attribute onError
     * @type {function}
     * @default function(){}
     */
    var onError = function () {};

    /**
     * The function to be called when the task finishes the jobs
     * 
     * @attribute onFinish
     * @type {function}
     * @default function(){}
     */
    var onFinish = function () {};

    /**
     * The callbacks of the task
     *
     * @attribute callbacks
     * @private
     * @type        {object}
     * @default {}
     */
     var callbacks = {};

    /**
     * Private helper that creates an onfinish function that wraps onfinish
     *
     * @method makeOnFinish
     * @private
     * @return  {function}      the wrapped onfinish function
     */
    function makeOnFinish () {

        // return the wrapped function
        return function (err) {

            // in case of error, call onError
            if (err)  return onError(err);
            
            // call the onfinish function without the error
            onFinish(arguments[1]);
        };
    }

    /**
     * Executes the task according to the type
     *
     * @method run
     * @param {string} type     enumerator: waterfall|parallel
     */
    this.run = function (type) {

        // what kind of flow
        switch(type) {
            case 'series': 
                async.series(callbacks, makeOnFinish());
                break;

            case 'waterfall':
                async.waterafall(callbacks, makeOnFinish());
                break;
                
            case 'parallel':  
                asynch.parallel(callbacks, makeOnFinish());
                break;

            default: 
                throw new Error("Invalid task type to run");
        }
    };
    
    /**
     * Adds a callback to the list of callback of the task.
     *
     * @method addCallback
     * @param {string}      name        the name of the callback. Will be used as name of the result
     * @param {function}    callback    the callback to register
     */
    this.addCallback = function (name, callback) {

        // do we have a name
        if (!name || name instanceof Function) throw new Error("Invalid parameters");

        // do we have a callback?
        if (!callback || !(callback instanceof Function)) throw new Error("Invalid parameters");

        // assign the callback to the set of callbacks
        callbacks[name] = callback;
    };

    /**
     * Register an on finish function.
     * 
     * @method onFinish
     * @param {function} callback
     */
    this.onFinish = function (callback) {

        // if no callback passed, do nothing
        if (!callback || !(callback instanceof Function)) return;

        // register the callback
        onFinish = callback;
    };

    /**
     * Register the function to be called in case of error.
     * 
     * @method onError
     * @param {function} callback
     */
    this.onError = function (callback) {

        // if no callback passed, do nothing
        if (!callback || !(callback instanceof Function)) return;

        // register the function
        onError = callback;
    };
}

// export the object
module.exports = Task;