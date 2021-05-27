if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const noteRoutes = require("./routes/notes");
const categoryRoutes = require("./routes/categories");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connected");
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// @route GET /posts/
// @desc Get all posts of the user
// @access Private

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/categories", categoryRoutes);
app.use("/categories/:categoryId/notes", noteRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server has Started");
});
