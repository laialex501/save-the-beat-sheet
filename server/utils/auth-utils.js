// Middleware for checking if user is logged in before carrying on with routes
const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    // User is not logged in
    res.redirect("/auth/login");
  } else {
    // User is logged in, so proceed to "next" piece of middleware
    next();
  }
};

module.exports = { isLoggedIn };
