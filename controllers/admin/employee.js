const Employee = require("../../models/Employee");

exports.getEmployeePage = (req, res) => {
	const { username, access } = req.session.user;
	res.render("../views/admin/employee", { username, access });
};

exports.postAddEmployee = async (req, res) => {
	const { name, username, password } = req.body;
	let access = req.body.access == "Admin" ? true : false;
	const emp = await Employee.findOne({ username: username });
	if (emp != null) return res.json({ error: "Username Taken" });
	const data = {
		name,
		username,
		password,
		access,
	};
	const employee = new Employee({ name, username, password, access });
	try {
		await employee.save();
	} catch (err) {
		console.log(err.message);
	}
	res.status(200).json(data);
};

exports.getAllEmployee = async (req, res, next) => {
	const name = req.params.name;
	const page = req.query.page;
	console.log(page);
	const empPerPage = 9;
	const employee = await Employee.find()
		.sort({ name: 1 })
		.skip(empPerPage * (page - 1))
		.limit(empPerPage);
	res.status(200).json(employee);
};

exports.deleteEmployee = async (req, res, next) => {
	const employeeID = req.params.employeeID;
	console.log(employeeID);
	const employee = await Employee.findByIdAndDelete(employeeID);
	res.status(200).json({ status: true });
};

exports.postUpdateEmployee = async (req, res, next) => {
	const name = req.body.name;
	const username = req.body.username;
	const password = req.body.password;
	let access = req.body.access == "Admin" ? true : false;
	const employeeID = req.body.employeeID;
	const data = {
		name,
		username,
		password,
		access,
	};
	const employee = await Employee.findById(employeeID);
	employee.name = name;
	employee.username = username;
	employee.password = password;
	employee.access = access;
	try {
		await employee.save();
	} catch (err) {
		console.log(err.message);
	}
	res.status(200).json(data);
};
exports.postSearchEmployee = async (req, res) => {
	console.log("Inside");
	console.log(req.body.searchTerm);
	const searchTerm = req.body.searchTerm;
	var employeeRes = await Employee.find({
		name: RegExp(searchTerm, "i"),
	});
	res.status(200).json(employeeRes);
};
