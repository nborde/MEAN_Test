'use strict';
var express = require('express');
var router = express.Router();
var js2xmlparser = require("js2xmlparser");

var employee = require('../models/employee.js');



/* GET /employees
TODO : Fix Application/xml. for some reason is not working.
 */
router.get('/', function(req, res, next) {
    console.log("routes_employee. getEmployeeList()");

    employee.find(function (err, employee) {
        if (err) return next(err);
        if(req.accepts('*/*')){
            res.status(400).send('You have to specify what you accept from the server');
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
            res.status(406).send('Accept format not allowed');
        }
    });
});

/* GET /todos/id */
router.get('/:id', function(req, res, next) {
    console.log("Geting employee : ",req.params.id);
    employee.findOne({'id' : req.params.id}, function (err, employee) {
        if (err) return next(err);
        if(req.accepts('*/*')){
            res.status(400).send('You have to specify what you accept from the server');
        }else if(req.accepts('xml')){
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
            res.status(406).send('Accept format not allowed');
        }
    });

});


// POST /employees
// Creates an employee with data contained in the body
router.post('/', function (req, res) {
    console.log("save employee - REST_API")
    var body = parseBodyDependingOnContentType(req, res);
    console.log("body : ", body);

    if(body === null) {
        res.status(400).send('Content-Type format not allowed');
        return;
    };

    if (!body.hasOwnProperty('id') || !body.hasOwnProperty('name')||!body.hasOwnProperty('salary')) {
        res.status(400).send('Error: Post syntax incorrect. Check required fields.');
        return;
    }else{
        employee.create(body, function (err, post){
            if (err) return next(err);
            //res.json(post);
            res.status(201).send("Employee created successfully");
        });
    }
});

// POST /employees
// Creates an employee with data contained in the body
router.put('/:id', function(req, res, next) {

    console.log("routes_employee - PUT - REST_API")
    var body = parseBodyDependingOnContentType(req, res);
    console.log("body : ", body);

    if(body === null) {
        res.status(400).send('Content-Type format not allowed');
        return;
    };

    if (!body.hasOwnProperty('id') || !body.hasOwnProperty('name')||!body.hasOwnProperty('salary')) {
        res.status(400).send('Error: Post syntax incorrect. Check required fields.');
        return;
    }

    employee.findByIdAndUpdate(body, function (err, post) {
        if (err) return next(err);
        //res.json(post);
        res.status(201).send("Employee updated successfully");
    });
});


// DELETE /employees/:id
// Deletes an employee by its id
router.delete('/employees/:_id', function (req, res) {


    employee.findOne({'_id' : req.params.id}, function (err, employee) {
        if (err) return next(err);
        if(req.accepts('*/*')){
            res.status(400).send('You have to specify what you accept from the server');
        }else if(req.accepts('xml')){
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
            console.log("employee : ",employee);
            res.json(employee); //res.send(JSON.stringify(employees)) works as well
        }else{
            res.status(406).send('Accept format not allowed');
        }
    }).remove();
    res.statusCode = 204 //No content in the response, it's a delete
    res.send("This text will not be sent but we need to send something in order to let the client know the response status code");
});

// Utils *******************************

//Reuse code in POST and PUT to obtain the body depending on which Content-Type the client sends
var parseBodyDependingOnContentType = function(req, res){
    var body = null;
    if(req.get('Content-Type') == 'application/xml' || req.get('Content-Type') == 'text/xml'){
        try{
            //explicit root and explicit array in false takes out the root node and takes each field out of the default array
            xml2js.parseString(req.rawBody, { explicitRoot: false, explicitArray : false }, function (err, result){

                if(err != null){
                    res.send("Malformed xml, cannot parse", 400);
                }else{
                    body = result;
                }
            })
        }catch(e){
            res.send("Oops! Error parsing xml request...", 500);
            console.log(e);
        }
    }
    else if (req.get('Content-Type') == 'application/json') {
        try{
            body = JSON.parse(req.rawBody); //JSON.parse is standard in browsers > IE8
        }catch(e){
            res.send("Malformed json, cannot parse", 400);
            console.log(e);
        }
    }
    return body;
}

//**************************************

module.exports = router;
