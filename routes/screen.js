const express = require("express");

const Router = express.Router();

const Device = require("../models/Device");

Router.get("/:deviceID", async (req, res) => {
	const { username, access } = req.session.user;
	try {
		const deviceID = req.params.deviceID;
		const device = await Device.findById(deviceID);
		const data = await device.cart.populate("items.product").execPopulate();
		res.render("screen", { data: data.items });
	} catch (error) {
		console.log(error);
	}
});

module.exports = Router;
