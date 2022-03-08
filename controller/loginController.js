const User = require("../models/People");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
//get login page
function getLogin(req, res, next) {
  res.render("index");
}

//login
async function login(req, res, next) {
  try {
    //find an user with the given email/username
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });
    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isValidPassword) {
        //prepare user object to generate token
        const userObject = {
          username: user.username,
          mobile: user.mobile,
          email: user.email,
          role: "user",
        };
        //generate token
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY, //1 day = 86400000ms
        });

        //****set cookie  ****/
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true, //to communicate through http only
          signed: true,
        });

        // save the logged in user's details to the local variable in client side
        res.locals.loggedInUser = userObject;

        res.render("inbox");
      } else {
        throw createError('"Failed to log in! Please try again..');
      }
    } else {
      throw createError('"Failed to log in! Please try again..');
    }
  } catch (err) {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

module.exports = {
  getLogin,
  login,
};
