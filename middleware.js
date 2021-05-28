const Category = require("./models/category");

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else res.redirect("/auth/login");
};

exports.authorizeDeleteCategory = async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (category.owner == req.user) return next();
  else res.redirec("/");
};

exports.authorizeUser = async (req, res, next) => {
  const category = await Category.findById(req.params.categoryId);
  if (category.owner == req.user.id) return next();
  else {
    console.log("You are not allowed");
    res.redirect("/");
  }
};
