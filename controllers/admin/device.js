const Device = require("../../models/Device");

exports.getDevicePage = (req, res) => {
	const { username, access } = req.session.user;
	res.render("../views/admin/device", { username, access });
};

exports.postAddDevice = async (req, res) => {
	const { name, macaddress } = req.body;
	let status = req.body.active == "Active" ? true : false;
	const data = {
		name,
		macaddress,
		status,
	};

	const device = new Device({ name, macaddress, status });
	try {
		await device.save();
	} catch (err) {
		console.log(err.message);
	}
	res.status(200).json(data);
};

exports.getAllDevice = async (req, res) => {
	const name = req.params.name;
	const device = await Device.find().sort({ name: 1 });

	res.status(200).json(device);
};

exports.deleteDevice = async (req, res) => {
	const deviceID = req.params.deviceID;
	const device = await Device.findByIdAndDelete(deviceID);
	res.status(200).json({ status: true });
};

exports.postUpdateDevice = async (req, res) => {
	const { name, macaddress, deviceID } = req.body;
	let active = req.body.active == "Active" ? true : false;
	const data = {
		name,
		macaddress,
		active,
	};

	const device = await Device.findById(deviceID);
	device.name = name;
	device.macaddress = macaddress;
	device.active = active;

	try {
		await device.save();
	} catch (err) {
		console.log(err.message);
	}
	res.status(200).json(data);
};
exports.postSearchDevice = async (req, res) => {
	console.log("Inside");
	console.log(req.body.searchTerm);
	const searchTerm = req.body.searchTerm;
	var deviceRes = await Device.find({
		name: RegExp(searchTerm, "i"),
	});
	res.status(200).json(deviceRes);
};
