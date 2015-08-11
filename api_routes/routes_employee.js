'use strict';
var express = require('express');
var router = express.Router();
var js2xmlparser = require("js2xmlparser");

var employee = require('../models/employee.js');



/* GET /employee listing. */
router.get('/', function(req, res, next) {
    console.log("routes_employee. getEmployeeList()");

    employee.find(function (err, employee) {
        if (err) return next(err);
        if(req.accepts('*/*')){
            res.send('You have to specify what you accept from the server', 400);
        }else if(req.accepts('xml')){
            // This function is failling.
            res.type('xml');
            var options = {
                wrapArray: {
                    enabled: true,
                    elementName : 'Employee'
                }
            };
            var employeeList = res.json(employee);
            res.send(js2xmlparser("Employees", employeeList, options)); //we need the wrapArray options here to generate valid xml structure
        }else if(req.accepts('json')){
            res.json(employee); //res.send(JSON.stringify(employees)) works as well
        }else{
            res.send('Accept format not allowed', 406);
        }


        //res.json(employee);
    });
});

/* GET /todos/id */
router.get('/:id', function(req, res, next) {
    console.log("Geting employee : ",req.params.id);

    employee.findOne({'id' : req.params.id}, function (err, employee) {

        if(req.accepts('*/*')){
            res.send('You have to specify what you accept from the server', 400);
        }else if(req.accepts('xml')){
            // This function is failling.
            res.type('xml');
            var options = {
                wrapArray: {
                    enabled: true,
                    elementName : 'Employee'
                }
            };
            var employeeList = res.json(employee);
            res.send(js2xmlparser("Employees", employeeList, options)); //we need the wrapArray options here to generate valid xml structure
        }else if(req.accepts('json')){
            res.json(employee); //res.send(JSON.stringify(employees)) works as well
        }else{
            res.send('Accept format not allowed', 406);
        }
    });

});



module.exports = router;
