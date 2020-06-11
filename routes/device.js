const express = require('express');

const router = express.Router();
const deviceController = require('../controllers/device');

router.get('/', deviceController.getProductsPage);

module.exports = router;
