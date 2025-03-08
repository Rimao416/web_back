
const express = require("express");
const articleRoutes=require("./routes/articlesRoutes")
const app = express();

app.use(express.json());
app.use("/api/v1/articles",articleRoutes)

module.exports=app