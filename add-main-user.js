const Employee = require("./models/Employee");

const addUser = async () => {
	const user = Employee.find({ username: "admin" });
	if (user == null) return;
	try {
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
