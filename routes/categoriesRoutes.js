const express = require("express");
const { deleteCategory, getCategory } = require("../controller/categoryController");
const router = express.Router();
router.route("/:id").delete(deleteCategory).get(getCategory);

module.exports = router;