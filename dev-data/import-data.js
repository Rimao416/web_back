const mongoose = require("mongoose");
const dotenv = require("dotenv");
const categories = require("./categories");
const Category = require("../models/categoryModel");
dotenv.config({ path: "./config.env" });
const { faker } = require('@faker-js/faker'); 
const Article = require("../models/articleModel");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.set("strictQuery", true);
mongoose.connect(DB).then(() => console.log("DB connection successful!"));

//   CREATE CATEGORIES
const importCategories = async () => {
  await Category.deleteMany();
  try {
    for (const category of categories) {
      await Category.create({ name: category });
    }
  } catch (err) {
    console.log(err);
  }

  console.log("Categories created successfully");
  process.exit();
};

const importArticles = async () => {
  await Article.deleteMany();
  console.log("Articles deleted successfully");
  const categoriesData =await Category.find();

  try {
    for (let i = 0; i < 15; i++) {
        const article=new Article({
          title: faker.commerce.productName(),
          description: faker.lorem.paragraph(),
          category: categoriesData[Math.floor(Math.random() * categoriesData.length)]._id,  
          price: Math.floor(Math.random() * 1000),
          rating: Math.floor(Math.random() * 5),
        })
        await article.save();
    }
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importCategories();
} else if (process.argv[2] === "--import-articles") {
  importArticles();
}
