// external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// internal imports
const User = require("../models/usersModel");

// get login page
const getLogin = (req, res, next) => {
  res.render("index", {
    title: "Login - Chat Application",
  });
};

// login a user
const login = async (req, res, next) => {
  try {
    // find user with email / mobile
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });

    if (user && user._id) {
      // validate password
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidPassword) {
        // prepare payload object to generate token
        const payload = {
          userId: user._id,
          username: user.name,
          email: user.email,
          mobile: user.mobile,
          role: "user",
        };

        // generate token
        const token = await jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        // set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });

        // set logged in user local identifier
        res.locals.loggedInUser = payload;

        res.render("inbox");
      } else {
        throw createError("Login failed! Please try again.");
      }
    } else {
      throw createError("Login failed! Please try again.");
    }
  } catch (err) {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
};

// logout a user
const logout = (req, res, next) => {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("logged Out!");
};

module.exports = {
  getLogin,
  login,
  logout,
};
