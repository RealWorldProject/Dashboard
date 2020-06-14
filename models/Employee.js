const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
	name: String,
	username: String,
	password: String,
	access: Boolean,
});

module.exports = mongoose.model('Employee', employeeSchema);