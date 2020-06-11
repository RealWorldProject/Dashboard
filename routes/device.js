const express = require('express');

const router = express.Router();
const deviceController = require('../controllers/device');

router.get('/', deviceController.getDevicePage);

module.exports = router;
