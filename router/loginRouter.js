// external routers
const express = require("express");

const router = express.Router();

//internal imports
const { getLogin, login } = require("../controller/loginController");
const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../middlewares/common/login/loginValidators");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

//set page title
const page_title = "Login";
//login page
router.get("/", decorateHtmlResponse(page_title), getLogin);

//login
router.post(
  "/",
  decorateHtmlResponse(page_title),
  doLoginValidators,
  doLoginValidationHandler,
  login
);

module.exports = router;
