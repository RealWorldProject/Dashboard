const express = require("express");
const Employee = require("../../models/Employee");

const Router = express.Router();

Router.get("/", (req, res) => {
	console.log("ballla");
	res.render("admin/login");
});

Router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await Employee.findOne({ username });
		if (user.password === password)
			return res.redirect("/billing/device-dashboard");
		// password incorrect
		return res.redirect("/login");
	} catch (err) {
		console.log(err);
	}
});

module.exports = Router;
