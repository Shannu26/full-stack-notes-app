const mongoose = require("mongoose");

const Note = require("./note");

const categorySchema = new mongoose.Schema({
  name: String,
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
});

categorySchema.post("findOneAndDelete", async function (category) {
  if (category.todos.length) {
    await Note.deleteMany({ _id: { $in: category.todos } });
  }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
