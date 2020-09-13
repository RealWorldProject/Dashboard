const express = require("express");

const router = express.Router();
const deviceController = require("../controllers/billing");
const checkAuth = require("../utils/check-auth");

router.get("/", checkAuth.normalAuth, deviceController.getDevicePage);

router.get("/device/:deviceID", deviceController.getBilling);
router.get("/add-to-device", deviceController.getAddToDevice);
router.post("/add-to-device", deviceController.postAddToDevice);
router.post("/add-to-device-test", deviceController.postAddToDeviceTest);
router.post("/delete", deviceController.postRemoveFromDevice);
router.get("/checkout/:billID", deviceController.getCheckout);
router.post("/checkout", deviceController.postCheckout);
router.get("/:deviceID", deviceController.getBillingData);

module.exports = router;
