// external imports
const express = require("express");

//internal imports
const { getInbox } = require("../controllers/inboxControllers");

// define inbox router
const router = express.Router();

// get inbox page
router.get("/", getInbox);

// module exports
module.exports = router;
