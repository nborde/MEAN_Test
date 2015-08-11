var mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    id_number: String,
    name: String,
    salary: String
});

employeeSchema.set('collection', 'employee');
module.exports = mongoose.model('employee', employeeSchema);