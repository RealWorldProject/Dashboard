const express = require("express");
const PORT = 5000;
const MONGODBURI = "mongodb://localhost:27017/Dashboard";
const connectDB = require("./utils/db");

const app = express();
app.set("view engine", "ejs");

app.use(express.json({ extended: false }));

app.use(express.static("public"));

// Defining Routes

//app.use('/admin/products', require('./routes/admin/products'));

// admin employee route
app.use("/admin/employee", require("./routes/admin/employee"));

app.use("/device", require("./routes/device"));

app.get("/", (req, res) => res.send("App Has Started!!!"));

// connecting DB
connectDB(MONGODBURI);
app.listen(PORT, () => console.log(`Server started at localhost:${PORT}`));
