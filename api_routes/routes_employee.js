var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Employee = require('../models/employee.js');


/* GET /employee listing. */
router.get('/', function(req, res, next) {
    console.log("routes_employee. getEmployeeList()")
    console.log("Employee : ", Employee);

    Employee.find(function (err, employee) {
        if (err) return next(err);
        console.log(employee);
        res.json(employee);
    });
});


module.exports = router;
