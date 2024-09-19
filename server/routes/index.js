const express = require("express");
const router = express.Router();
const passport = require("passport");
const genPassword = require("../lib/passwordUtils").genPassword;
const connection = require("../config/database");
const User = connection.models.User;
const isAuth = require('./authMiddleware').isAuth;
const isAdmin = require('./authMiddleware').isAdmin;

/**
 * -------------- POST ROUTES ----------------
 */

// Login route
router.post("/login", passport.authenticate("local", {
  successRedirect: "/login-success",
  failureRedirect: "/login-failure",
}));

// Register route
router.post("/register", async (req, res) => {
  try {
    const { uname, pw } = req.body;
    const saltHash = genPassword(pw);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
      username: uname,
      hash: hash,
      salt: salt,
      admin: false,  // Assuming registration does not automatically make users admin
    });

    const user = await newUser.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

/**
 * -------------- GET ROUTES ----------------
 */

// Home route
router.get("/", (req, res) => {
  res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});

// Login page route
router.get("/login", (req, res) => {
  const form =
    '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="uname">\
    <br>Enter Password:<br><input type="password" name="pw">\
    <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
});

// Register page route
router.get("/register", (req, res) => {
  const form =
    '<h1>Register Page</h1><form method="POST" action="/register">\
                    Enter Username:<br><input type="text" name="uname">\
                    <br>Enter Password:<br><input type="password" name="pw">\
                    <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
});

// Protected route example
router.get("/protected-route", isAuth, (req, res) => {
  res.send("You made it to the protected route");
});

// Admin route example
router.get("/admin-route", isAdmin, (req, res) => {
  res.send("You made it to the admin route");
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/"); // Redirect after logout
  });
});

// Login success page
router.get("/login-success", (req, res) => {
  res.send(
    '<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>'
  );
});

// Login failure page
router.get("/login-failure", (req, res) => {
  res.send("You entered the wrong password.");
});

module.exports = router;
