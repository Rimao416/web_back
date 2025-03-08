const mongoose = require("mongoose");
const articleSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  price: Number,
  rating: Number,
  slug: String,
});

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
