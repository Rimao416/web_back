const mongoose = require("mongoose");
const Article = require("./articleModel");
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "La categorie est demandée"],
  },
});

categorySchema.pre("findOneAndDelete", async function (next) {
    try {
      const category = await this.model.findOne(this.getQuery()); // Récupérer la catégorie supprimée
      console.log(category)
      if (category) {
        await Article.deleteMany({ category: category._id }); // Supprimer les articles associés
      }
      next();
    } catch (err) {
      next(err);
    }
  });
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
