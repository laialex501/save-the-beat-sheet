const router = require("express").Router();
const passport = require("passport");
const { generateToken, sendToken } = require("../auth/token-utils");

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

router
  .route("/logout")
  .post(passport.authenticate("jwt", { session: false }), (req, res) => {
    console.log(`Logging out user ${req.user.id}`);
    res.clearCookie("jwt");
    return res.status(200).send("Logged out.");
  });

module.exports = router;
