
var fs = require("fs");
var main;

/**
 * The tests
 */
exports.Package = {
    setUp : function (callback) {

        // get the package
        main = require("../controlflow.js");

        // done setting up
        callback();
    },
    'The module must have main.js file': function (test) {
            
        test.notStrictEqual(main, undefined, "Expected main to be defined");

        //done
        test.done();
    },

    'The module must have a fullname': function (test) {
        
        test.notStrictEqual(main.fullname, undefined, "Expected fullname to be defined");

        // done
        test.done();
    },

    'The module must have a version number': function (test) {
        
        test.notStrictEqual(main.version, undefined, "Expected version number to be defined");

        // done
        test.done();
    },
    'The module must have the same name as quoted in package.json': function (test) {

        // read the package data
        var data = fs.readFileSync("./package.json")
        var json = JSON.parse(data.toString());

        // are the package names the same?
        test.equals(json.name, main.fullname, "Expected module name to be the same in both places.");

         // done
        test.done();
    },

    'The module must have the same version as quoted in package.json': function (test) {

        // read the package data
        var data = fs.readFileSync("./package.json")
        var json = JSON.parse(data.toString());
        
        // are the versions the same?
        test.notStrictEqual(json.version, undefined, "Expected fs to be defined");
        test.equals(main.version, json.version, "Expected the same module version!");

         // done
        test.done();
    }
};