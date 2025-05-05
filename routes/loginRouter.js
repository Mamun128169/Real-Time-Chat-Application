// external imports
const express = require("express");

//internal imports
const { getLogin } = require("../controllers/loginControllers");

// define logIn router
const router = express.Router();

// get login page
router.get("/", getLogin);

// module exports
module.exports = router;
