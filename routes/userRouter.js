// external imports
const express = require("express");

//internal imports
const { getUsers } = require("../controllers/userControllers");

// define users router
const router = express.Router();

// get users page
router.get("/", getUsers);

// module exports
module.exports = router;
