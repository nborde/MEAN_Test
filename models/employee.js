var mongoose = require('mongoose');

var EmployeeSchema = new mongoose.Schema({
    id: String,
    name: String,
    salary: String
});

module.exports = mongoose.model('Employee', EmployeeSchema);