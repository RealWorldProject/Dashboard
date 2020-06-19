const express = require('express');
const PORT = 5000;
const MONGODBURI = 'mongodb://localhost:27017/Dashboard';
const connectDB = require('./utils/db');

const app = express();
app.set('view engine', 'ejs');

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

// Defining Routes

// admin product route
app.use('/admin/product', require('./routes/admin/products'));

// admin employee route
app.use('/admin/employee', require('./routes/admin/employee'));

// admin device route
app.use('/admin/device', require('./routes/admin/device'));

app.use('/billing/device-dashboard', require('./routes/billing'));

// connecting DB
connectDB(MONGODBURI);
const server = app.listen(PORT, () =>
	console.log(`Server started at http://localhost:${PORT}`)
);
const io = require('./socket').init(server);
io.on('connection', (socket) => {
	console.log('Socket Connected');
});
