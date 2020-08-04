const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
	name: String,
	price: Number,
	qty: Number,
	barcode: Number,
});

module.exports = mongoose.model("Product", productSchema);
