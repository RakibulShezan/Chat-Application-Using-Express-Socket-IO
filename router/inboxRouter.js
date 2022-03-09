// external routers
const express = require("express");

const router = express.Router();

//internal imports
const { getInbox } = require("../controller/inboxController");
const { checkLogin } = require("../middlewares/common/checkLogin.");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

//inbox page
router.get("/", decorateHtmlResponse("Inbox"), checkLogin, getInbox);

module.exports = router;
