// external imports
const express = require("express");

//internal imports
const {
  getUsers,
  addUser,
  removeUser,
} = require("../controllers/userControllers");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/userValidators");
const authenticateUser = require("../middlewares/common/AuthenticateUser");

// define users router
const router = express.Router();

// get users page
router.get("/", decorateHtmlResponse("Users"), authenticateUser, getUsers);

// create user
router.post(
  "/",
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

// remove user
router.delete("/:id", removeUser);

// module exports
module.exports = router;
