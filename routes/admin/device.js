const express = require("express");

const router = express.Router();

const deviceController = require("../../controllers/admin/device");

const checkAuth = require("../../utils/check-auth");

router.get("/", checkAuth.adminAuth, deviceController.getDevicePage);

//add device
router.post("/add-device", deviceController.postAddDevice);

//get all device
router.get("/all-device", checkAuth.adminAuth, deviceController.getAllDevice);

// delete device
router.get("/delete-device/:deviceID", deviceController.deleteDevice);

// edit device
router.post("/update-device", deviceController.postUpdateDevice);

//search routes
router.post("/search-device", deviceController.postSearchDevice);

module.exports = router;
