if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const passport = require("passport");
const localStrategy = require("passport-local");
const session = require("express-session");
const flash = require("connect-flash");

const User = require("./models/user");

const noteRoutes = require("./routes/notes");
const categoryRoutes = require("./routes/categories");
const userRoutes = require("./routes/users");

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
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/auth", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/categories/:categoryId/notes", noteRoutes);

app.all("*", (req, res) => {
  res.redirect("/categories");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server has Started");
});
