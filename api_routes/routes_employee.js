'use strict';
var express = require('express');
var router = express.Router();

//var mongoose = require('mongoose');
var employee = require('../models/employee.js');



/* GET /employee listing. */
router.get('/', function(req, res, next) {
    console.log("routes_employee. getEmployeeList()")
    employee.find(function (err, employee) {
        if (err) return next(err);
        res.json(employee);
    });
});

/* GET /todos/id */
router.get('/:id', function(req, res, next) {
    employee.findOne({'id' : req.params.id}, function (err, employee) {
        console.log("Geting employee : ",req.params.id);
        if (err) return next(err);
        res.json(employee);
    });

});



module.exports = router;
