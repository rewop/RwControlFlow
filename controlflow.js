/**
 * Module to handle the control flow of a node application.
 * It is mainly a wrapper for the control flow functions of async module.
 *
 * @module  control-flow
 * @requires    async
 */

/**
 * The control flow object that lets create the several kinds of control flow tasks
 *
 * @class   ControlFlow
 */
function ControlFlow () {

    /**
     * Returns a waterfall task object.
     *
     * @method createWaterfall
     * @return {Waterfall} The object that generates a waterfall control flow task
     */
    this.createWaterfall = function () {

        // create a new waterfall task
        throw new Error("Not implemented yet method")
    }

    /**
     * Creates a parallel task object.
     *
     * @method
     * @return {Parallel} The object that generates a parallel control flow task
     */
    this.createParallel = function () {

        // create a new parallel task
        throw new Error("Not implemented yet method")
    }
}

// export the module
module.exports = ControlFlow;