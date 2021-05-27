const express = require("express");
const router = express.Router();

const Category = require("../models/category");

router.get("/", async (req, res) => {
  const categories = await Category.find({});
  res.render("categories/index", { categories });
});

router.post("/", async (req, res) => {
  const newCategory = new Category(req.body);
  await newCategory.save();
  res.redirect("/categories");
});

router.delete("/:id", async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.redirect("/categories");
});

module.exports = router;
