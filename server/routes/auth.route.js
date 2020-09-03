const router = require("express").Router();
const passport = require("passport");

router.route("/").get((req, res) => {
  res.send("Auth!");
});

// Auth logout
router.route("/logout").get((req, res) => {
  // handle with passport
  res.send("logging out");
});

// Authenticate with google
router.route("/google").get(
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// Callback route for google to redirect to
router
  .route("/google/redirect")
  .get(passport.authenticate("google"), (req, res) => {
    res.send(req.user);
  });

module.exports = router;
