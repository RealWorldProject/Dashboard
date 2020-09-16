const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const billSchema = new Schema({
	products: [{ productName: String, productPrice: Number, quantity: Number }],
	totalPrice: Number,
	paid: Number,
	date: String,
});

module.exports = mongoose.model("Bill", billSchema);
