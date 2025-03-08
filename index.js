
const express = require("express");
const articleRoutes=require("./routes/articlesRoutes")
const categoryRoutes=require("./routes/categoriesRoutes")
const app = express();

app.use(express.json());
app.use("/api/v1/articles",articleRoutes)
app.use("/api/v1/categories",categoryRoutes)
module.exports=app