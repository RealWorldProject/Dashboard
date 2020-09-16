const express = require("express");

const router = express.Router();

const productController = require("../../controllers/admin/products");
const checkAuth = require("../../utils/check-auth");

router.get("/", checkAuth.adminAuth, productController.getProductPage);

//add product
router.post("/add-product", productController.postAddProduct);

//get all product
router.get(
	"/all-product",
	checkAuth.adminAuth,
	productController.getAllProduct
);

// delete product
router.get("/delete-product/:productID", productController.deleteProduct);

// edit product
router.post("/update-product", productController.postUpdateProduct);

router.get("/stat", productController.getStat);
router.post("/stat", productController.postStat);

module.exports = router;
