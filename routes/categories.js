const express = require("express");
const router = express.Router();

const Category = require("../models/category");

const { isLoggedIn, authorizeDeleteCategory } = require("../middleware");

router.get("/", isLoggedIn, async (req, res) => {
  console.log(req.user);
  const categories = await Category.find({ owner: req.user.id });
  console.log(categories);
  res.render("categories/index", { categories });
});

router.post("/", isLoggedIn, async (req, res) => {
  const newCategory = new Category(req.body);
  newCategory.owner = req.user;
  await newCategory.save();
  res.redirect("/categories");
});

router.delete("/:id", isLoggedIn, authorizeDeleteCategory, async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.redirect("/categories");
});

module.exports = router;
