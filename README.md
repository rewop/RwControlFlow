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
}
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

## The Series task

## The Waterfall task

## The Parallel task

### The Parallel limited task
