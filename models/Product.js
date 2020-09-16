const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
	name: String,
	price: Number,
	qty: Number,
	category: String,
	barcode: String,
});

module.exports = mongoose.model("Product", productSchema);
