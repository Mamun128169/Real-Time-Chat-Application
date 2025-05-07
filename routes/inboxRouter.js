// external imports
const express = require("express");

//internal imports
const { getInbox } = require("../controllers/inboxControllers");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const authenticateUser = require("../middlewares/common/AuthenticateUser");

// define inbox router
const router = express.Router();

// get inbox page
router.get("/", decorateHtmlResponse("Inbox"), authenticateUser, getInbox);

// module exports
module.exports = router;
