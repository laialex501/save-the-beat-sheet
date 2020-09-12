const passport = require("passport");
const GoogleTokenStrategy = require("passport-google-id-token");
const JWTStrategy = require("passport-jwt").Strategy;
const User = require("../models/user.model");
const debug = require("debug")("passport-config");

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
    .catch((err) => debug("Error: " + err));
});

passport.use(
  new GoogleTokenStrategy(
    {
      // Options for the google strategy
      clientID: process.env.GOOGLE_CLIENT_ID,
    },
    (parsedToken, googleId, done) => {
      // Try to find the user in the database
      User.findOne({ googleID: googleId }).then((user) => {
        if (user) {
          // Already have the user
          debug("(Google) User is: ", user);

          // Callback
          done(null, user);
        } else {
          // If no user was found, create a new one
          const newUser = new User({
            name: parsedToken.payload.name,
            email: parsedToken.payload.email,
            picture: parsedToken.payload.picture,
            googleID: googleId,
          });

          // Save user
          newUser
            .save()
            .then((newUser) => {
              debug("(Google) New user created: " + newUser);
            })
            .catch((err) => {
              debug("Error: " + err);
            });

          // Callback
          done(null, newUser);
        }
      });
    }
  )
);

// Method for extracting JWT token from a cookie in requests
const cookieExtractor = (req) => {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwt_payload, done) => {
      const databaseID = jwt_payload.id;
      // Try to find the user in the database
      User.findById(databaseID)
        .then((user, err) => {
          if (err) {
            // An error occured
            debug("Error: " + err);
            return done(err, false);
          }
          if (user) {
            // Already have the user
            // console.log("(JWT) User is: ", user);

            // Callback
            debug("User is: ", user);
            done(null, user);
          } else {
            // If no user was found, jwt_token could not authenticated

            // Callback
            debug("No user found");
            done(null, false);
          }
        })
        .catch((err) => {
          debug("Error: " + err);
        });
    }
  )
);
