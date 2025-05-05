// external imports
const express = require("express");

//internal imports
const { getUsers } = require("../controllers/userControllers");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

// define users router
const router = express.Router();

// get users page
router.get("/", decorateHtmlResponse("Users"), getUsers);

// create user
// router.post();

// module exports
module.exports = router;
