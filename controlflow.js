/**
 * Module to handle the control flow of a node application.
 * It is mainly a wrapper for the control flow functions of async module.
 *
 * @module  control-flow
 * @requires    async
 */

// dependencies
var Series = require("./libs/Series.js");

/**
 * The control flow object that lets create the several kinds of control flow tasks.
 *
 * @class   ControlFlow
 */
function ControlFlow () {

    /**
     * Returns a series task object.
     *
     * @method createSeries
     * @return {Series} The object that generates a waterfall control flow task
     */
    this.createSeries = function () {

        // create a new series task
        return new Series();
    };

    /**
     * Creates a parallel task object.
     *
     * @method createParallel
     * @return {Parallel} The object that generates a parallel control flow task
     */
    this.createParallel = function () {

        // create a new parallel task
        throw new Error("Not implemented yet method");
    };
}

// export the module
module.exports = ControlFlow;