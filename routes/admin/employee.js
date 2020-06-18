const express = require("express");

const router = express.Router();

const employeeController = require("../../controllers/admin/employee");

router.get("/", employeeController.getEmployeePage);

//add employee
router.post("/add-employee", employeeController.postAddEmployee);

//get all employee
router.get("/all-employee", employeeController.getAllEmployee);

// delete employee
router.get("/delete-employee/:employeeID", employeeController.deleteEmployee);

// edit employee
router.post("/update-employee", employeeController.postUpdateEmployee);

//search routes
router.post("/search-employee", employeeController.postSearchEmployee);

module.exports = router;
