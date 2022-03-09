// external routers
const express = require("express");

const router = express.Router();

//internal imports
const { getLogin, login, logout } = require("../controller/loginController");
const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../middlewares/login/loginValidators");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const { redirectLoggedIn } = require("../middlewares/common/checkLogin.");

//set page title
const page_title = "Login";
//login page
router.get("/", decorateHtmlResponse(page_title), redirectLoggedIn  , getLogin);

//login
router.post(
  "/",
  decorateHtmlResponse(page_title),
  doLoginValidators,
  doLoginValidationHandler,
  login
);

//logout router
router.delete("/", logout);

module.exports = router;
