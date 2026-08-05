const express = require("express");
const router = express.Router();

const categoryController = require("../controller/categoryController");
const AuthCheck = require("../middleware/AuthCheck");
const userAuthCheckauthorize = require("../middleware/userAuthCheck");
const adminAuthCheck = require("../middleware/adminAuthCheck");


router.post("/create/category",adminAuthCheck, categoryController.createCategory);

router.get("/gatAllCategory",AuthCheck,categoryController.getAllCategories);

router.get("/getCategory/:id",AuthCheck,categoryController.getCategoryById);

router.put("/category/update/:id",adminAuthCheck,categoryController.updateCategory);

router.delete("/category/delete/:id",adminAuthCheck,categoryController.deleteCategory);

module.exports = router;