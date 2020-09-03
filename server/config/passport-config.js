const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/user.model");

// Allow use of environmental variables
require("dotenv").config();

// Serialize user
passport.serializeUser((user, done) => {
  // user.id is all we want to serialize and pass on to the cookie
  const databaseID = user.id;
  // Pass the user id of the user that we found in the passport callback on to the next stage
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser((id, done) => {
  // the database id is all we need to identify a user
  User.findById(id)
    .then((user) => {
      // Pass the user we found on to the next stage, attaches user property to request object so we can manage in route handler
      done(null, user);
    })
    .catch((err) => console.error("Error: " + err));
});

passport.use(
  new GoogleStrategy(
    {
      // Options for the google strategy
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      // Check if user already exists in our database
      User.findOne({ googleID: profile.id })
        .then((currentUser) => {
          if (currentUser) {
            // Already have the user
            console.log("User is: ", currentUser);
            done(null, currentUser);
          } else {
            // If not, create user in our database
            const newUser = new User({
              username: profile.displayName,
              googleID: profile.id,
            });

            newUser
              .save()
              .then((newUser) => {
                console.log("New user created: " + newUser);
              })
              .catch((err) => console.error("Error" + err));
            done(null, newUser);
          }
        })
        .catch((err) => {
          console.error("Error: " + err);
        });
    }
  )
);
