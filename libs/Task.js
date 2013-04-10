// dependencies
var asynch = require('async');

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
     * Private helper that creates a callback to wrap a function of the task
     * 
     * @method makeCallback
     * @private
     * @param   {function} callback     the callback to add to the task
     * @return  {function}              the wrapper of the callback
     */
    function makeCallback (callback) {

        // return the wrapper
        return function (err) {

            // in case of error, call onError function
            if (err) return onError(err);

            // remove the error argument that is undefined
            args.shift();
            
            // call the callback
            callback.apply(undefined, args);
        };
    }

    /**
     * Private helper that creates an onfinish function that wraps onfinish
     *
     * @method makeOnFinish
     * @private
     * @return  {function}      the wrapped onfinish function
     */
    function makeOnFinish (err) {

        // return the wrapped function
        return function () {
            
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
            case 'waterfall': 
                async.series(callbacks, makeOnFinish(onFinish));
                break;

            case 'parallel':  
                asynch.parallel(callbacks, makeOnFinish(onFinish));
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
        callbacks[name] = makeCallback(callback);
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
        task.onFinish(callback);
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
        task.onError(callback);
    };
}

// export the object
module.exports = Task;