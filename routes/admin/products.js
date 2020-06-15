const express = require("express");

const router = express.Router();

const productController = require("../../controllers/admin/products");

router.get("/", productController.getProductPage);

//add product
router.post("/add-product", productController.postAddProduct);

//get all product
router.get("/all-product", productController.getAllProduct);

// delete product
router.get("/delete-product/:productID", productController.deleteProduct);

// edit product
router.post("/update-product", productController.postUpdateProduct);

module.exports = router;
