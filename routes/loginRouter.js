// external imports
const express = require("express");

//internal imports
const { getLogin, login, logout } = require("../controllers/loginControllers");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {
  loginValidationHandler,
  loginValidators,
} = require("../middlewares/log/loginValidators");
const redirectLoggedIn = require("../middlewares/common/redirectLoggedIn");

// define logIn router
const router = express.Router();

// set page title
const page_title = "Login";

// get login page
router.get("/", decorateHtmlResponse(page_title), redirectLoggedIn, getLogin);

// login a user
router.post(
  "/",
  decorateHtmlResponse(page_title),
  loginValidators,
  loginValidationHandler,
  login
);

// logout a user
router.delete("/", logout);

// module exports
module.exports = router;
