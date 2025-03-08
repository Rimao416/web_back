const express = require("express");
const { getArticles, createArticle, getArticle, deleteArticle, updateArticle, checkId } = require("../controller/articleController");
const router = express.Router();

router.route("/").get(getArticles).post(createArticle);
router.param("id",checkId)
router
  .route("/:id")
  .get(getArticle)
  .patch(updateArticle)
  .delete(deleteArticle);
module.exports = router;
