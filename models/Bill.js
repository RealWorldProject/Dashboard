const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const billSchema = new Schema({
	products: [{ product: Object, quantity: Number }],
	totalPrice: Number,
	paid: Number,
});

module.exports = mongoose.model('Bill', billSchema);
