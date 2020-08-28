const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
<<<<<<< HEAD
	name: String,
	price: Number,
	qty: Number,
	barcode: Number,
=======
  name: String,
  price: Number,
  qty: Number,
  category: String,
  barcode: Number,
>>>>>>> 27326b033e7c4b048c14968c17d329ef2f15cd30
});

module.exports = mongoose.model("Product", productSchema);
