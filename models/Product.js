const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
	// <<<<<<< HEAD
	// 	name: String,
	// 	price: Number,
	// 	qty: Number,
	// 	barcode: Number,

	name: String,
	price: Number,
	qty: Number,
	category: String,
	barcode: String,
});

module.exports = mongoose.model("Product", productSchema);
