const Product = require("../../models/Product");
const Bill = require("../../models/Bill");

exports.getProductPage = (req, res) => {
	const { username, access } = req.session.user;
	res.render("../views/admin/products", { username, access });
};

exports.postAddProduct = async (req, res) => {
	const name = req.body.name;
	const price = parseInt(req.body.price);
	const qty = parseInt(req.body.qty);
	const barcode = req.body.barcode;
	const weight = req.body.weight;
	const data = {
		name,
		price,
		qty,
		barcode,
		weight,
	};
	const product = new Product({ name, price, qty, barcode, weight });
	try {
		await product.save();
	} catch (err) {
		console.log(err.message);
	}
	res.status(200).json(data);
};

exports.getAllProduct = async (req, res, next) => {
	const name = req.params.name;
	const page = req.query.page;
	const proPerPage = 9;
	const product = await Product.find()
		.sort({ name: 1 })
		.skip(proPerPage * (page - 1))
		.limit(proPerPage);
	res.status(200).json(product);
};

exports.deleteProduct = async (req, res, next) => {
	const productID = req.params.productID;
	console.log(productID);
	const product = await Product.findByIdAndDelete(productID);
	res.status(200).json({ status: true });
};

exports.postUpdateProduct = async (req, res, next) => {
	const name = req.body.name;
	const price = req.body.price;
	const qty = req.body.qty;
	const category = req.body.category;
	const productID = req.body.productID;
	const data = {
		name,
		price,
		qty,
		category,
	};
	const product = await Product.findById(productID);
	product.name = name;
	product.price = price;
	product.qty = qty;
	product.category = category;
	try {
		await product.save();
	} catch (err) {
		console.log(err.message);
	}
	res.status(200).json(data);
};

exports.getStat = async (req, res, next) => {
	const { username, access } = req.session.user;
	let date = new Date();
	date = date.toISOString().slice(0, 10);
	try {
		const bills = await Bill.find({ date });
		let totalSales = 0;
		bills.forEach((bill) => {
			totalSales += bill.totalPrice;
		});
		res.render("admin/stats", { username, access, bills, totalSales });
	} catch (error) {
		console.log(error);
	}
};
exports.postStat = async (req, res, next) => {
	const { username, access } = req.session.user;
	const { date } = req.body;
	console.log(date);
	try {
		const bills = await Bill.find({ date });
		let totalSales = 0;
		bills.forEach((bill) => {
			totalSales += bill.totalPrice;
		});
		res.render("admin/stats", { username, access, bills, totalSales });
	} catch (error) {
		console.log(error);
	}
};
exports.postSearchProduct = async (req, res) => {
	console.log("Inside");
	console.log(req.body.searchTerm);
	const searchTerm = req.body.searchTerm;
	var employeeRes = await Product.find({
		name: RegExp(searchTerm, "i"),
	});
	res.status(200).json(employeeRes);
};
