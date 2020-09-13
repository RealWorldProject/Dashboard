const Device = require("../models/Device");
const Product = require("../models/Product");
const Bill = require("../models/Bill");
const socket = require("../socket");

exports.getDevicePage = async (req, res) => {
	const { username, access } = req.session.user;
	try {
		const devices = await Device.find();
		res.render("billing", { devices, username, access });
	} catch (errror) {
		console.log(errror);
	}
};

exports.getBilling = async (req, res) => {
	const { username, access } = req.session.user;
	try {
		const deviceID = req.params.deviceID;
		const device = await Device.findById(deviceID);
		const data = await device.cart.populate("items.product").execPopulate();
		console.log(data.items);
		res.render("device-billing", { data: data.items, username, access });
	} catch (error) {
		console.log(error);
	}
};

exports.getBillingData = async (req, res) => {
	try {
		const deviceID = req.params.deviceID;
		const device = await Device.findById(deviceID);
		const data = await device.cart.populate("items.product").execPopulate();
		let cleanedData = data.items;
		cleanedData = cleanedData.map((data) => {
			return { ...data.product._doc, quantity: data.quantity };
		});
		res.status(200).json(cleanedData);
	} catch (error) {
		console.log(error);
	}
};

exports.getAddToDevice = async (req, res, next) => {
	try {
		const products = await Product.find({});
		res.render("add-to-device", {
			products,
		});
	} catch (error) {
		console.log(error.message);
	}
};

exports.postAddToDevice = async (req, res, next) => {
	const { barcode, deviceID } = req.body;
	try {
		const device = await Device.findById(deviceID);
		const product = await Product.find({ barcode: barcode });
		console.log(product[0]._id);
		await device.addToCart(product[0]._id);
		product.qty -= 1;
		await product.save();
		res.status(200).json(product);
	} catch (err) {
		console.log(err);
		res.send("notdone");
	}
};

exports.postAddToDeviceTest = async (req, res, next) => {
	const { deviceID, productID } = req.body;
	try {
		const device = await Device.findById(deviceID);
		const product = await Product.findById(productID);
		console.log(product);
		await device.addToCart(product._id);
		product.qty -= 1;
		await product.save();
		res.redirect("/billing/device-dashboard/add-to-device");
	} catch (err) {
		console.log(err);
		res.send("notdone");
	}
};
exports.getCheckout = async (req, res, next) => {
	// add a query to find the latest bill
	const billID = req.params.billID;
	const bill = await Bill.findById(billID);
	res.status(200).json(bill);
};

exports.postCheckout = async (req, res, next) => {
	const totalPrice = req.body.totalPrice;
	const paid = req.body.paid;
	const deviceID = req.body.deviceID;
	const device = await Device.findById(deviceID);
	const data = await device.cart.populate("items.product").execPopulate();
	const updatedData = data.items.map((item) => {
		return { quantity: item.quantity, product: { ...item.product._doc } };
	});
	const bill = new Bill({
		products: updatedData,
		totalPrice: totalPrice,
		paid: paid,
	});
	await bill.save((err, savedBill) => {
		if (err) throw err;
		else {
			let billID = savedBill._id;
			device.clearCart();
			const io = socket.getIO();
			io.emit("cartCleared", "The cart is Cleared");
			res.status(200).json({ billID: billID });
		}
	});
};

exports.postRemoveFromDevice = async (req, res, next) => {
	const productID = req.body.productID;
	const deviceID = req.body.deviceID;
	const device = await Device.findById(deviceID);
	device.deleteFromCart(productID);
	res.status(200).json({ status: true });
};
