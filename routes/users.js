const express = require("express");
const router = express.Router();

const User = require("../models/user");
const passport = require("passport");

router.get("/register", (req, res) => {
  res.render("auth/register", { msg: req.flash("error") });
});

router.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const newUser = new User({ username, email });
    const user = await User.register(newUser, password);
    req.login(user, (err) => {
      if (err) console.log(err);
      else console.log(user);
    });
    res.redirect("/categories");
  } catch (err) {
    console.log(err.message);
    req.flash("error", err.message);
    res.redirect("/auth/register");
  }
});

router.get("/login", (req, res) => {
  res.render("auth/login", { msg: req.flash("error") });
  // res.render("auth/login", { msg: "Hi" });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/categories",
    failureRedirect: "/auth/login",
    failureFlash: "Username and Password are not valid",
  })
);

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/auth/login");
});

module.exports = router;
