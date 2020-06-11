const mongoose = require('mongoose');

const connectDB = async (MONGODBURI) => {
	try {
		mongoose.connect(MONGODBURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('MongoDB Connected');
	} catch (err) {
		console.log(err);
	}
};

module.exports = connectDB;
