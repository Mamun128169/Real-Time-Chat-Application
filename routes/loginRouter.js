// external imports
const express = require("express");

//internal imports
const { getLogin } = require("../controllers/loginControllers");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

// define logIn router
const router = express.Router();

// get login page
router.get("/", decorateHtmlResponse("Login"), getLogin);

// module exports
module.exports = router;
