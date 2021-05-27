const express = require("express");
const router = express.Router({ mergeParams: true });

const Note = require("../models/note");
const Category = require("../models/category");

router.get("/", async (req, res) => {
  const category = await Category.findById(req.params.categoryId).populate(
    "todos"
  );
  res.render("notes/index", { category });
});

router.post("/", async (req, res) => {
  const newTodo = new Note({ title: req.body.title });
  const category = await Category.findById(req.params.categoryId);
  const todo = await newTodo.save();
  category.todos.push(todo);
  await category.save();
  res.redirect(`/categories/${req.params.categoryId}/notes`);
});

router.get("/:id/edit", async (req, res) => {
  const todo = await Note.findById(req.params.id);
  const category = await Category.findById(req.params.categoryId).populate(
    "todos"
  );
  res.render("notes/edit", { todo, category });
});

router.put("/:id", async (req, res) => {
  await Note.findByIdAndUpdate(req.params.id, { ...req.body });
  res.redirect(`/categories/${req.params.categoryId}/notes`);
});

router.delete("/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  await Category.findByIdAndUpdate(req.params.categoryId, {
    $pull: {
      todos: req.params.id,
    },
  });
  res.redirect(`/categories/${req.params.categoryId}/notes`);
});

module.exports = router;
