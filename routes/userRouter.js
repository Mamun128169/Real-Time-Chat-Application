// external imports
const express = require("express");

//internal imports
const { getUsers, addUser } = require("../controllers/userControllers");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/userValidators");

// define users router
const router = express.Router();

// get users page
router.get("/", decorateHtmlResponse("Users"), getUsers);

// create user
router.post(
  "/",
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

// module exports
module.exports = router;
