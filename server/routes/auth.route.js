const router = require("express").Router();
const passport = require("passport");
const { generateToken, sendToken } = require("../auth/token-utils");
const { isLoggedIn } = require("../auth/auth-utils");

// Enable use of environmental variables
require("dotenv").config();

router.route("/google").post(
  passport.authenticate("google-id-token"),
  (req, res, next) => {
    // Check if a user was found
    if (!req.user) {
      return res.send(401, "User not authenticated");
    }
    next();
  },
  generateToken,
  sendToken
);

// Logout user
router
  .route("/logout")
  .post(
    [passport.authenticate("jwt", { session: false }), isLoggedIn],
    (req, res) => {
      console.log(`Logging out user ${req.user.id}`);
      res.clearCookie("jwt");
      return res.status(200).send("Logged out.");
    }
  );

router
  .route("/verifylogin")
  .post(
    [passport.authenticate("jwt", { session: false }), isLoggedIn],
    (req, res) => {
      res.status(200).send(req.user);
    }
  );

module.exports = router;
