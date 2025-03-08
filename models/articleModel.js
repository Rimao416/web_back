const mongoose = require("mongoose");
const slugify = require("slugify");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Le titre est demandé"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "La description est demandée"],
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "La catégorie est demandée"],
  },
  price: {
    type: Number,
    required: [true, "Le prix est demandé"],
    min: [0, "Le prix doit être supérieur à 0"],
    max: [1000, "Le prix doit être inférieur à 1000"],
  },
  rating: Number,
  slug: {
    type: String,
  },
});

// ✅ Middleware pour générer le slug avant de sauvegarder
articleSchema.pre("save", function (next) {
  if (this.isModified("title") || this.isNew) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
