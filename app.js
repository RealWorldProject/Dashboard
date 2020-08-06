const express = require("express");
const PORT = 5000;
const MONGODBURI = "mongodb://localhost:27017/Dashboard";
const connectDB = require("./utils/db");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const flash = require("connect-flash");

const app = express();
app.set("view engine", "ejs");

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

const store = new MongoDBStore({
	uri: MONGODBURI,
	collection: "sessions",
});

app.use(
	session({
		secret: "this app",
		resave: false,
		saveUninitialized: false,
		store: store,
	})
);

//for flash msg
app.use(flash());

// Defining Routes

// routes for auth
app.use("/", require("./routes/admin/auth"));

// admin product route
app.use("/admin/product", require("./routes/admin/products"));

// admin employee route
app.use("/admin/employee", require("./routes/admin/employee"));

// admin device route
app.use("/admin/device", require("./routes/admin/device"));

app.use("/billing/device-dashboard", require("./routes/billing"));

// for screen
app.use("/screen", require("./routes/screen"));

// for adding a main admin user
const addUser = require("./add-main-user");
// connecting DB
connectDB(MONGODBURI);
const server = app.listen(PORT, () => {
	console.log(`Server started at http://localhost:${PORT}`);
	addUser();
});
const io = require("./socket").init(server);
io.on("connection", (socket) => {
	console.log("Socket Connected");
});
