# RwControlFlow Module
This module is a wrapper of part of the [async](https://github.com/caolan/async) module. It provides a different syntax to create Series, Waterfall and Parallel tasks.

## Installation
This repository is not publish in npm.     
Therefore to install it through npm you can do the following:
```
npm install git://github.com/rewop/RwControlFlow.git
```

If you want to insert this module in the dependencies of your repository, just add the following line in the dependencies of your package.json
```
RwControlFlow: git://github.com/rewop/RwControlFlow.git
```

Feel free to fork and contributing in the development of this package.

## The ControlFlow object
To start creating a task, you need first to get the ControlFlow object. It is the factory of every kind of tasks. For example:
```
// the dependency
var ControlFlow = require("RwControlFlow");

// get the factory
var taskFactory = new ControlFlow();

// get a series task
var seriesTask = taskFactory.createSeries();

// get a waterfall task
var waterfallTask = taskFactory.createWaterfall();

...
```

## The functions to set up a task
A task of every kind is an object that has several attributes. First of all there are the list of functions to be run. Then there is a function to be called once the task is finished. Third there is a function to be called in case errors occur to an of the functions given.

### Adding a function to a task
To add a function to a task object you can call the function `addCallback()'. The functions takes a name and the callback function as arguments.
```
// the dependency
var ControlFlow = require("RwControlFlow");

// get the factory
var taskFactory = new ControlFlow();

// get a series task
var seriesTask = taskFactory.createSeries();

// add some functions to be run
seriesTask.addCallback("myFunc1", function(arg, callback) { ... });
seriesTask.addCallback("myFunc2", function(arg, callback) { ... });
```

The argument of each callback depend on the type of the task that is being runned. 

### Adding a function to be run at the end of the execution of the task
To set up a function to be run when he task finishes you can use the function `onFinish()`. For example:
```
seriesTasks.onFinish(function(results) {

   // the results are the ones from each callback of the task
   ...
});
```
The argument taken by the callback function will be an object that has as keys the names of the callbacks, and as values the results of the relative callbacks.   
For instance, if two functions are added to the task, respectively _function1 and _function2, than the result object is like the follwing:
```
{
   function1: ... // results function 1
   function2: ... // results function 2
}
```

### Handling Errors
Errors can be handled by register a callaback with the function `onError`. When an error occurs in any of the callback registered in the task, the onFinish callback is never run, whil the onError function will be run.
```
seriesTasks.onFinish(functon(results) {
   
   // in case of error this function is never called
});
seriesTasks.onError(function(err) {
   
   // here handle the error
});
```
To raise an error you can simply call the callback of the function with first parameter an error.
```
seriesTasks.addCallback(function(callback) {
   
   // there is an error. let's trigger it
   if (true) return callback(err);
   
   // here there is no error
   return callback(undefined, "All ok");
});
```

### Running a task
When a task is defined with its fucntions and onFinish and onError callback, it can be run by calling the function `run()`. This function may take some arguments depending on the type of tasks.

## The Series task
The series task is a task that runs the callback on series, and when they are done, all the results passed to the callbacks of each function are available in the results arguments of the onFinish function.

Each function registered to the task will get a callback as argumnet. This callback will take care to run the next function, and takes as first argument eventual errors, and as second arguments eventual results.

Each callback does not know anything about the results of the results of the previous calbacks.

## The Waterfall task
The Waterfall task is similar to the Series task, with the difference that each functions takes as first arguments results of the previous run function.
The final result in the onFinish function is not an object of results of each functions of the task, but it is the simmple results of the last function run by the task.

Each function that has a follwing function to be called (not the onFinish) can pass more than one results. Those results will be given to the next function by means of parameters.
Check the example below:

```
// we need a cotnrol flow
var ControlFlow = require("RwControlFlow);

// we create a waterfall task
var waterfall = ControlFlow.createWaterfall();

// let's add a first function
waterfall.addCallback("firstFunction", function(callback) {
   
   // let's return a result
   callback(undefined, "result1");
});

// let's add a second function
waterfall.addCallback("secondFunction", function(results, callback) {
   
   // this prints the string 'result1'
   console.log(results);
   
   // let's pass some results. This time we return two results
   callback(undefined, "result2", "result3");
});

// let's add a third task
waterfall.addCallback("thirdFunction", function(result1, result2,  callback) {
   
   // this prints the string 'result2'
   console.log(result1);
   
   // this prints the string 'result3'
   console.lot(result2);
   
   // if this is the last function, the results should be given in only one parameter, not like other functions
   callback(undefined, "The final result");   
});

// the onFinish function
waterfall.onFinish(function(results) {
   
   // results only contains the results of the last callback
   // the follwing prints 'The final result'
   console.log(results);
});

waterfall.run();
```
The `run()` function does not take any arguments.

## The Parallel task
The Parallel task tries to run all the functions in parallel. All the results, will be available to the onFinish function.    
If one of the functions returns an error, the onError function is called immediately, and the onFinish function is never called.   

When you run the task with the "run()" functions, you can pass an integer as argument, to limit the number of parallel tasks runned simultaneously.

For example, let's suppose we registered 6 functions to a Parallel task, the following call to `run()` will run three functions a time:
```
// run the task with maximum of 3 simultaneous functions
parallel.run(3);
```
If no limits is wanted, just do not pass any arguments.

