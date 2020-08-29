const Employee = require("./models/Employee");

const addUser = async () => {
	try {
		const user = await Employee.findOne({ username: "admin" });
		if (user != null) return;
		const emp = new Employee({
			name: "admin",
			username: "admin",
			password: "admin",
			access: true,
		});
		await emp.save();
	} catch (e) {
		console.log(e);
	}
};

module.exports = addUser;
