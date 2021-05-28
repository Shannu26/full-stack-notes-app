const express = require("express");
const router = express.Router();

const User = require("../models/user");
const passport = require("passport");

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  const newUser = new User({ username, email });
  const user = await User.register(newUser, password);
  req.login(user, (err) => {
    if (err) console.log(err);
    else console.log(user);
  });
  res.redirect("/");
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/categories",
    failureRedirect: "/",
  })
);

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

module.exports = router;
