const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./index");
dotenv.config({ path: "./config.env" });
// console.log(process.env)
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.set("strictQuery", true);

mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
