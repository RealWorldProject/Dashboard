const express = require('express');

const router = express.Router();
const deviceController = require('../controllers/billing');

router.get('/', deviceController.getDevicePage);

router.get('/device/:deviceID', deviceController.getBilling);
router.get('/add-to-device', deviceController.getAddToDevice);
router.post('/add-to-device', deviceController.postAddToDevice);
router.post('/delete', deviceController.postRemoveFromDevice);
router.get('/checkout/:billID', deviceController.getCheckout);
router.post('/checkout', deviceController.postCheckout);

module.exports = router;
