// external routers
const express = require("express");

const router = express.Router();

//internal imports
const { checkLogin } = require("../middlewares/common/checkLogin.");
const {
  getUsers,
  addUser,
  removeUser,
} = require("../controller/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/userValidators");

//users page
router.get("/", decorateHtmlResponse("Users"), checkLogin, getUsers);

//add user
router.post(
  "/",
  checkLogin,
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

//delete user
router.delete("/:id", removeUser);

module.exports = router;
