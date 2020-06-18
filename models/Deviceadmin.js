const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deviceSchema = new Schema({
	name: String,
    macaddress: String,
    active: Boolean,
});

module.exports = mongoose.model('Deviceadmin', deviceSchema);