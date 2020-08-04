const express = require("express");
const Employee = require("../../models/Employee");

const Router = express.Router();

Router.get("/", (req, res) => {
	res.render("admin/login", {
		errorMsg: req.flash("error"),
	});
});

Router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await Employee.findOne({ username });
		if (!user) {
			req.flash("error", "Invalid Username or Password.");
			return res.redirect("/");
		}
		if (user.password === password) {
			req.session.isLoggedIn = true;
			req.session.user = user;
			if (user.access) return res.redirect("/admin/product");
			else return res.redirect("/billing/device-dashboard");
		}
		// password incorrect
		req.flash("error", "Invalid Username or Password.");
		return res.redirect("/");
	} catch (err) {
		console.log(err);
	}
});

Router.post("/logout", (req, res) => {
	req.session.destroy((err) => {
		res.redirect("/");
	});
});

module.exports = Router;
