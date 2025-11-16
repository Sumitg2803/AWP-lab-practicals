// models/assignment.js
const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Assignment", assignmentSchema);
