var mongoose = require('mongoose');
console.log("entra");
var TodoSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
  note: String,
  date: String
});

module.exports = mongoose.model('Todo', TodoSchema);
